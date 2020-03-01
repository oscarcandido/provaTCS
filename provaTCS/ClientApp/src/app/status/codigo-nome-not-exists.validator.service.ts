import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";

import { debounceTime, switchMap, map, first } from 'rxjs/operators';

import { StatusService } from "./status.service";
import { Status } from "./status";


@Injectable()
export class CodigoNomeNotExistsValidatorService {
    constructor(
        private statusService: StatusService
    ) { }

    checkCodigoExists(data: Status) {
        if (!data) {

            return (control: AbstractControl) => {
                return control
                    .valueChanges
                    .pipe(debounceTime(300))
                    .pipe(switchMap(codigo =>
                        this.statusService.checkIfCodigoExists(codigo)
                    ))
                    .pipe(map(Exists => Exists ? { codigoExists: true } : null))
                    .pipe(first());
            }
        }
        else {
            return null;
        }
    }
    checkNomeExists(data: Status) {
        if (!data) {

            return (control: AbstractControl) => {
                return control
                    .valueChanges
                    .pipe(debounceTime(300))
                    .pipe(switchMap(nome =>
                        this.statusService.checkIfNomeExists(nome)
                    ))
                    .pipe(map(Exists => Exists ? { nomeExists: true } : null))
                    .pipe(first());
            }
        }
        else {
            return null;
        }
    }
}
