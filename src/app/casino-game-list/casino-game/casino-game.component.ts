import { Component, Input, OnInit } from '@angular/core';
import { CasinoGame } from 'src/app/casino-game-list/casino-game.model';

@Component({
  selector: 'app-casino-game',
  templateUrl: './casino-game.component.html',
  styleUrls: ['./casino-game.component.css']
})
export class CasinoGameComponent implements OnInit {

  @Input() game: CasinoGame;

  constructor() { }

  ngOnInit(): void {
  }

}
