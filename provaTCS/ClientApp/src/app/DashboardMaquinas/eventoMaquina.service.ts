import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { EventoMaquina } from "./EventoMaquina";
import { environment } from "src/environments/environment";


const API_URL = environment.apiUrl;

@Injectable({ providedIn: "root"})
export class EventoMaquinaService{
    constructor(
        private http: HttpClient
    ) { }

    geraEventoAleatorio() {
        return this.http.get<EventoMaquina[]>(API_URL + "Evento_Maquina/GeraEventoAleatorio");
    }
}
