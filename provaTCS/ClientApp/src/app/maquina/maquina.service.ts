import { Injectable } from "@angular/core";
import { Maquina } from "./Maquina";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";


const API_URL = environment.apiUrl;

@Injectable({providedIn: "root"})
export class MaquinaService {

    constructor(
        private http: HttpClient
    ) { }

    getAll() {
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

    checkIfExists(Nome:string) {
        return this.http.get(API_URL + "Maquina/" + Nome);
    }
}
