import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { CasinoGame } from './casino-game.model';
import { CasinoGamesService } from './casino-games.service';

@Component({
  selector: 'app-casino-game-list',
  templateUrl: './casino-game-list.component.html',
  styleUrls: ['./casino-game-list.component.css']
})
export class CasinoGameListComponent implements OnInit, OnDestroy {

  games : CasinoGame[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private casinoGameService: CasinoGamesService) { }

  ngOnInit(): void {

    this.route.data.subscribe(
      (data: Data) => {
        this.games = data['games'];

        if (this.games.length === 0) {
          this.router.navigateByUrl('page-not-found');
        } else {
          this.casinoGameService.startRequestingJackpot();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.casinoGameService.stopRequestingJackpot();
  }

}
