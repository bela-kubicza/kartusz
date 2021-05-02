import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { isObservable } from 'rxjs';
import { CasinoGamesService } from './casino-game-list/casino-games.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loading: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router, private casinoGamesService: CasinoGamesService) {}

  ngOnInit() {

    this.casinoGamesService.gamesLoaded.subscribe (
      loaded => {
        this.loading = false;
      }
    )

    const games = this.casinoGamesService.requestGamesByCategory('');
    if (isObservable(games)) {
      games.subscribe();
    }

       
  
  }
}
