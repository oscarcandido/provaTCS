import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Status } from "./status";

const API_URL = "https://localhost:44397/api/"

@Injectable({providedIn: "root"})
export class StatusService {
    constructor(
        private http: HttpClient
    ) { }

    getAll() {
        return this.http.get<Status[]>(API_URL +"Status")
    }

    getAtivos() {
        return this.http.get<Status[]>(API_URL +"Status/GetAtivos")
    }

    Insert(novoStatus: Status) {
        return this.http.post(API_URL + "Status", novoStatus);
    }

    Update(status: Status) {
        return this.http.put(API_URL + "Status", status);
    }

    checkIfCodigoExists(Codigo: string) {
        return this.http.get(API_URL + "Status/CheckCodigoExists/" + Codigo)
    }

    checkIfNomeExists(Nome: string) {
        return this.http.get(API_URL + "Status/CheckNomeStatusExists/" + Nome)
    }
}
