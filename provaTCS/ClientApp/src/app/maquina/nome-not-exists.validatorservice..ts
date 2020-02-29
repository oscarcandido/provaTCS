import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";

import { debounceTime, switchMap, map, first } from 'rxjs/operators';

import { MaquinaService } from "./maquina.service";
@Injectable()
export class NomeNotExistsValidatorService {
    constructor(
        private maquinaService: MaquinaService
    ) { }

    checkNomeMaquinaExists() {
        return (control: AbstractControl) => {
            return control
                .valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(nome =>
                    this.maquinaService.checkIfExists(nome)
                ))
                .pipe(map(Exists => Exists ? { nomeExists: true } : null))
                .pipe(first());
        }
    }
}
