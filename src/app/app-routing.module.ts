import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CasinoGameListComponent } from './casino-game-list/casino-game-list.component';
import { CasinoGamesResolver } from './casino-game-list/casino-games-resolver.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: 'game/:category', component: CasinoGameListComponent, resolve: {games: CasinoGamesResolver} },
  {path: 'page-not-found', component: PageNotFoundComponent },
  {path: '', redirectTo: '/game/top', pathMatch: 'full'},
  {path: '**', redirectTo: 'page-not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CasinoGamesResolver]
})
export class AppRoutingModule { }
