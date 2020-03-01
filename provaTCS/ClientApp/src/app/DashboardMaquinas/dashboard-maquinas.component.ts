import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { EventoMaquinaService } from "./eventoMaquina.service";
import { EventoMaquina } from "./EventoMaquina";


const tempoPadrao: number = 5000;

@Component({
    templateUrl: "./dashboard-maquinas.component.html"
})
export class DashboardMaquinasComponent implements OnInit, OnDestroy{

    dados: EventoMaquina[] = [];
    @ViewChild('intervaloInput') intervaloInput: ElementRef<HTMLInputElement>;
    tempoAtualizacao :number
    atualizaPainel: any
    constructor(
        private eventoMaquinaService: EventoMaquinaService,
    ) { }

    
 
    ngOnInit(): void {
        this.tempoAtualizacao = tempoPadrao;
        this.geraEventoAleatorio()
        this.atualizaPainel = setInterval(() => this.geraEventoAleatorio(), this.tempoAtualizacao)
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
                if (!this.intervaloInput.nativeElement.value) {
                   this.intervaloInput.nativeElement.valueAsNumber = this.tempoAtualizacao/1000;
                }
            })
    }
    


    ngOnDestroy(): void {
        clearInterval(this.atualizaPainel);
    }

    changeInterval() {

        var ValorSegundos = this.intervaloInput.nativeElement.valueAsNumber;
        var ValorMilisegundos = ValorSegundos * 1000;
        this.tempoAtualizacao = ValorMilisegundos;
        clearInterval(this.atualizaPainel);
        this.atualizaPainel = setInterval(() => this.geraEventoAleatorio(), this.tempoAtualizacao)

    }
}
