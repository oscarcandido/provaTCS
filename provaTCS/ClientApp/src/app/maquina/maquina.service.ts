import { Injectable } from "@angular/core";
import { Maquina } from "./Maquina";
import { HttpClient } from "@angular/common/http";

const API_URL = "https://localhost:44397/api/"

@Injectable({providedIn: "root"})
export class MaquinaService {

    constructor(
        private http: HttpClient
    ) { }

    getAll() {
        console.log("aqui também")
        return this.http.get<Maquina[]>(API_URL + "Maquina");
    };

    getAtivos() {
        return this.http.get<Maquina[]>(API_URL + "Maquina/GetAtivos");
    }

    Insert(NovaMaquina : Maquina) {
        return this.http.post(API_URL + "Maquina", NovaMaquina);
    }

    Update(Maquina: Maquina) {
        return this.http.put(API_URL + "Maquina", Maquina);
    }
}
