export class CasinoGame {
    jackpot: number = -1;

    constructor(
        public id : string,
        public name : string,
        public imageUrl : string,
        public categories : string[]
    ) {}


}