import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {
  isLoaded = false;

  constructor(private router: Router) {
   
    
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 200);
  }

  startGame() {
    // Navigation logic to the GameScreenComponent
    this.router.navigate(['/game']);
  }

}
