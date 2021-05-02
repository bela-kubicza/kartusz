import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { CasinoGame } from "./casino-game.model";
import { CasinoGamesService } from "./casino-games.service";

@Injectable()
export class CasinoGamesResolver implements Resolve<CasinoGame[]> {

    constructor(private casinoGameService: CasinoGamesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CasinoGame[]> | Promise<CasinoGame[]> | CasinoGame[] {

        return this.casinoGameService.requestGamesByCategory(route.params['category']);

    }

}