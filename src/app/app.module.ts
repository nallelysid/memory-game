import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './pages/start/start.component';
import { MemoryGameComponent } from './pages/memory-game/memory-game.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    MemoryGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
