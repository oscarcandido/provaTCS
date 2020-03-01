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

    @Input() tempoAtualizacao = 5000;

    ngOnInit(): void {
        this.geraEventoAleatorio()
    }


    geraEventoAleatorio() {
        
        this.eventoMaquinaService.geraEventoAleatorio()
            .subscribe(dados => {
                this.dados = dados;
                $(document).ready(function () {
                    $('.NomeStatus').animate({ opacity: '0.4' }, "slow");
                    $('.NomeStatus').animate({ opacity: '1' }, "slow");
                    $('.CodStatus').animate({ opacity: '0.4' }, "slow");
                    $('.CodStatus').animate({ opacity: '1' }, "slow");
                })
                console.log(this.dados);
            })
    }
    
    atualizaPainel = setInterval(() => this.geraEventoAleatorio(), this.tempoAtualizacao)

    ngOnDestroy(): void {
        clearInterval(this.atualizaPainel);
    }
}
