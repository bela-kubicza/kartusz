import { Pipe, PipeTransform } from "@angular/core";
import { CasinoGamesService } from "../casino-game-list/casino-games.service";

@Pipe({
    name: 'orderedmenulabels'
})
export class OrderedMenuLabelsPipe implements PipeTransform {

    constructor(private casinoGameService: CasinoGamesService) {}


    transform(value: any) {

        const orderedMenuLabels = [];

        if (value.includes('top')) {
            orderedMenuLabels.push('top');
        }

        if (value.includes('new')) {
            orderedMenuLabels.push('new');
        }

        for (const category of value) {
            if (category !== 'top' && category !== 'new' && !this.casinoGameService.categoryOther.includes(category)) {
                orderedMenuLabels.push(category);
            }
        }    
        
        orderedMenuLabels.push('other');

        return orderedMenuLabels;
    }

}