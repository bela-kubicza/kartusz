import { Directive, HostBinding, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { CasinoGame } from "../casino-game.model";

@Directive({
    selector: '[appRibbons]'
})
export class TopNewRibbonDirective implements OnInit{
    @Input() game: CasinoGame;
    @HostBinding('class') classes:string[] = [];

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {

        if (this.game.categories.includes('top') && this.route.snapshot.params['category'] !== 'top') {
            this.classes.push('ribbon-top');
        }

        if (this.game.categories.includes('new') && this.route.snapshot.params['category'] !== 'new') {
            this.classes.push('ribbon-new');
        }

        this.route.params.subscribe(
            (params:Params) => {
                this.classes = [];

                if (this.game.categories.includes('top') && params['category'] !== 'top') {
                    this.classes.push('ribbon-top');
                }
        
                if (this.game.categories.includes('new') && params['category'] !== 'new') {
                    this.classes.push('ribbon-new');
                }

            }
        )

    }

}