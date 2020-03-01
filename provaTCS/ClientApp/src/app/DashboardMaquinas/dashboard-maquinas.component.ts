import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { EventoMaquinaService } from "./eventoMaquina.service";
import { EventoMaquina } from "./EventoMaquina";

@Component({
    templateUrl: "./dashboard-maquinas.component.html"
})
export class DashboardMaquinasComponent implements OnInit,OnDestroy{

    dados: EventoMaquina[] = [];
    constructor(
        private eventoMaquinaService: EventoMaquinaService
    ) { }

    @Input() tempoAtualizacao = 10000;

    ngOnInit(): void {
        this.geraEventoAleatorio()
    }


    geraEventoAleatorio() {
        
        this.eventoMaquinaService.geraEventoAleatorio()
            .subscribe(dados => {
                this.dados = dados;
                console.log(this.dados)
            })
    }
    
    atualizaPainel = setInterval(() => this.geraEventoAleatorio(), this.tempoAtualizacao)

    ngOnDestroy(): void {
        clearInterval(this.atualizaPainel);
    }
}
