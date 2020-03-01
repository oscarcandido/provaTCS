import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { EventoMaquina } from "./EventoMaquina";


const API_URL = "https://localhost:44397/api/"

@Injectable({ providedIn: "root"})
export class EventoMaquinaService{
    constructor(
        private http: HttpClient
    ) { }

    geraEventoAleatorio() {
        return this.http.get<EventoMaquina[]>(API_URL + "Evento_Maquina/GeraEventoAleatorio");
    }
}
