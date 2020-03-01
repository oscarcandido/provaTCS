import { Component, Input } from "@angular/core";
import { EventoMaquina } from "../EventoMaquina";

@Component({
    selector: "tcs-displayMaquina",
    templateUrl: "./display-maquina.component.html",
    styleUrls:["display-maquina.component.css"]
})
export class DisplayMaquinaComponent {

    @Input() dados: EventoMaquina;

    constructor() {
        console.log(this.dados);
        var cor = 'primary'
    }

}
