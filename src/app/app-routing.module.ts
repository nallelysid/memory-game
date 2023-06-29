import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './pages/start/start.component';
import { MemoryGameComponent } from './pages/memory-game/memory-game.component';

const routes: Routes = [
  { path: "start", component: StartComponent },
  { path: "game", component: MemoryGameComponent },
  { path: "", redirectTo: '/start', pathMatch: "full" },
  {path: '**', component: StartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
