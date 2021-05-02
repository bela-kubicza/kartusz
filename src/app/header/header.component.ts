import { Component, OnInit } from '@angular/core';
import { CasinoGamesService } from '../casino-game-list/casino-games.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories: string[];

  constructor(private casinoGameService: CasinoGamesService) { }

  ngOnInit(): void {
    this.categories = this.casinoGameService.getCategories();

    this.casinoGameService.gamesLoaded.subscribe(
      () => {
        this.categories = this.casinoGameService.getCategories();
      }
    )
  }

}
