import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { CasinoGame } from './casino-game.model';

export const CasinoGameCategoryOther = 'other';

@Injectable({providedIn: 'root'})
export class CasinoGamesService {

  categoryOther = ['ball', 'virtual', 'fun'];
  gamesLoaded = new Subject<boolean>();
  jackpotUpdated = new Subject<boolean>();
  private categories: string[] = [];
  private games: CasinoGame[] = [];
  private gamesByCategory: CasinoGamesDict = {};
  private gamesById: CasinoGameDict = {};
  private jackpotRequestSubscription: Subscription;

  constructor(private http: HttpClient) {
  }

  public getCategories(): string[] {
    return this.categories.slice();
  }

  public startRequestingJackpot() {

    if (!this.jackpotRequestSubscription || this.jackpotRequestSubscription.closed) {

      this.requestJackpot();

      this.jackpotRequestSubscription = interval(5000).subscribe(
          () => {
            this.requestJackpot();
          }
      );

    }

  }

  public stopRequestingJackpot() {
    if (this.jackpotRequestSubscription && !this.jackpotRequestSubscription.closed) {
      this.jackpotRequestSubscription.unsubscribe();
    }
  }

  public requestGamesByCategory(category: string) {

    if (this.games.length > 0) {
      return this.getGamesByCategory(category);
    }

    return this.requestGames().pipe(map(
        responseData => {
          const games: CasinoGame[] = [];

          for (const i in responseData) {
            const gameObj = responseData[i];
            games.push(new CasinoGame(gameObj.id, gameObj.name, gameObj.image, gameObj.categories));
          }

          this.processCasinoGames(games);
          this.gamesLoaded.next(true);

          return this.getGamesByCategory(category);
        }
    ));
  }

  private processCasinoGames(games: CasinoGame[]): void {

    this.games = games;

    for (const game of this.games) {

      this.gamesById[game.id] = game;

      for (const category of game.categories) {

        if (!this.gamesByCategory[category]) {
          this.gamesByCategory[category] = [];
        }

        this.gamesByCategory[category].push(game);

        if (!this.categories.includes(category)) {
          this.categories.push(category);
        }
      }
    }
  }

  private setGameJackpot(id: string, amount: number): void {

    if (this.gamesById[id]) {
      this.gamesById[id].jackpot = amount;
    }
  }

  private getGamesByCategory(category: string): CasinoGame[] {

    if (category === CasinoGameCategoryOther) {

      let otherGames = [];

      for (const cat of this.categoryOther) {

        if (this.gamesByCategory[cat]) {
          otherGames = otherGames.concat(this.gamesByCategory[cat]);
        }
      }

      return otherGames;
    }

    return this.gamesByCategory[category] ? this.gamesByCategory[category] : [];
  }

  private requestJackpot() {

    this.http.get<{ [index: number]: { game: string, amount: number } }>('http://stage.whgstage.com/front-end-test/jackpots.php').subscribe(
        responseData => {
          for (const i in responseData) {
            const jackpotObj = responseData[i];

            this.setGameJackpot(jackpotObj.game, jackpotObj.amount);
          }
        }
    );
  }

  private requestGames() {

    return this.http.get<{
      [index: number]: {
        categories: string[],
        name: string,
        image: string,
        id: string
      }
    }>('http://stage.whgstage.com/front-end-test/games.php');
  }

}

interface CasinoGameDict {
  [key: string]: CasinoGame;
};

interface CasinoGamesDict {
  [key: string]: CasinoGame[];
};
