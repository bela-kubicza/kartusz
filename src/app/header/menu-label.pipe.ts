import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'menulabel'
})
export class MenuLabelPipe implements PipeTransform {

    transform(value: string) {

        switch(value) {
            case 'top':
                return 'top games';
            case 'new':
                return 'new games';
            default:
                return value;
        }
    }

}