import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject, delay, interval, takeUntil, timer } from 'rxjs';
import Swal from 'sweetalert2'

interface Card {
  symbol: string;
  flipped: boolean;
}

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.css']
})
export class MemoryGameComponent implements OnInit {

  @ViewChild('audioPlayer') audioPlayer: any;
  @ViewChild('audioPlayerError') audioPlayerError: any;
  @ViewChild('audioPlayerSuccess') audioPlayerSuccess: any;
  @ViewChild('audioPlayerticking') audioPlayerticking: any;
  
  
  public cards: Card[] = [];
  public flippedCards: Card[] = [];
  public volumeOffIcon : any = '/assets/images/sound--off.svg';
  public volumeOnIcon: any = '/assets/images/sound--on.svg';
  public music: any = '/assets/background.mp3';
  public musicSuccess: any = '/assets/correct.mp3';
  public musicError: any = '/assets/incorrect.mp3';
  public ticking: any = '/assets/ticking.mp3'
  public selectedCard: any;
  public disabledCards: boolean = false;
  public isMuted = true;
  public modalMessage: string = '';
  public showModal: boolean = false;
  public timeLeft: number = 30;

  private destroy$ = new Subject<void>();


  
  constructor(private sanitizer: DomSanitizer) {}
  ngOnInit() {
    this.initializeCards();
    this.startTimer();


  }

  initializeCards() {
    const symbols = ['./assets/images/star.svg','./assets/images/moon.svg','./assets/images/sun.svg','./assets/images/comet.svg']
    for (let i = 0; i < symbols.length; i++) {
      this.cards.push({ symbol: symbols[i], flipped: false });
      this.cards.push({ symbol: symbols[i], flipped: false });
    }
    this.shuffleCards();
  }

  shuffleCards() {
    // Shuffle the cards array using Fisher-Yates algorithm
    let currentIndex = this.cards.length;
    let temporaryValue: Card;
    let randomIndex: number;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = this.cards[currentIndex];
      this.cards[currentIndex] = this.cards[randomIndex];
      this.cards[randomIndex] = temporaryValue;
    }
  }
  startTimer() {
   
    timer(0,1000)
    .pipe(
      takeUntil(this.destroy$),
      takeUntil(timer(30000))
    )
    .subscribe(() => {
      
      this.timeLeft--;
      if (this.timeLeft <= 10) {    
        this.playAudio();
      }

      if (this.timeLeft === 0) {
    
        this. stopInterval();  
        this.stopBackgroundSound();
        // this.openModal("Oops! You didn’t find them all.");
        this.showModal = true;
        this.modalMessage = 'Oops! You didn’t find them all.';
      }
    });
  }

  stopInterval() {
    this.destroy$.next();
    this.destroy$.complete();
    const audioPlayer = this.audioPlayerticking.nativeElement;  
    audioPlayer.pause();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    const audioPlayer = this.audioPlayerticking.nativeElement;  
    audioPlayer.pause();
  }

  playAudio() {
    const audioPlayer = this.audioPlayerticking.nativeElement;  
    audioPlayer.currentTime = 0;
    audioPlayer.play();
  }

 

  flipCard(card: Card) {

    if(this.disabledCards){
      return;
    }
    if (!card.flipped) {
      card.flipped = true;
  
      if (!this.selectedCard) {
        this.selectedCard = card;
      } else {
       
        if (this.selectedCard.symbol === card.symbol) {
          
          this.openModal('nice! it’s a match');
          
          this.audioPlayerSuccess.nativeElement.play();
          this.selectedCard = null; 
          this.checkMatch();
        } else {
          
          this.disabledCards = true;
          this.audioPlayerError.nativeElement.play();
        
          setTimeout(() => {
            this.selectedCard.flipped = false;
            card.flipped = false;
            this.selectedCard = null; 
            this.disabledCards = false;
            this.openModal('sorry, but this is not a match');
          }, 1000); 
        }
      }
     
    }

  }



  checkMatch() {
    if (this.cards.every((card) => card.flipped)) {
     
      this.stopInterval();
      this.stopBackgroundSound();
      //this.openModal("Congratulations!!","You did it!");
      this.showModal = true;
      this.modalMessage = 'You did it!';      
    }
  }

  playAgain() {
    this.timeLeft = 30;
    this.cards = [];
    this.flippedCards = [];
    this.showModal = false;
    this.modalMessage = '';
    this.initializeCards();
    this.startTimer();
  }

  toggleSound() {
    this.isMuted = !this.isMuted;

    if (this.isMuted) {
      // Stop playing the background sound
      this.stopBackgroundSound();
    } else {
      // Start playing the background sound
      this.playBackgroundSound();
    }
  }

  playBackgroundSound() {
    // Code to play the background sound
    this.audioPlayer.nativeElement.play();
  }

  stopBackgroundSound() {
    // Code to stop the background sound
    this.audioPlayer.nativeElement.pause();
    this.audioPlayer.nativeElement.currentTime = 0;
    this.audioPlayerticking.nativeElement.pause();
  }

  openModal(message: string, text: string = ""){
    let timerInterval: any;
    Swal.fire({
      title: message,
      text: text,
      timer: 800,
      timerProgressBar: true,     
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
     
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  }

  
}
