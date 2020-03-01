import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { StatusService } from "./status.service";
import { ListaStatusComponent } from "./lista-status.component";
import { Status } from "./status";
import { AlertService } from "../shared/components/alert/alert.service";
import { CodigoNomeNotExistsValidatorService } from "./codigo-nome-not-exists.validator.service";


@Component({
    templateUrl: "./edit-status.component.html",
    providers:[CodigoNomeNotExistsValidatorService]
})
export class EditStatusComponent implements OnInit{
    statusForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private statusService: StatusService,
        public dialogRef: MatDialogRef<ListaStatusComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Status,
        private alertService: AlertService,
        private codigoNomeNotExistsValidatorService: CodigoNomeNotExistsValidatorService
    ) { }

    ngOnInit(): void {
        //cria formulário de status
        this.statusForm = this.formBuilder.group({
            codigo: ['',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(45)
                ],
                this.codigoNomeNotExistsValidatorService.checkCodigoExists(this.data)
            ],
            nome: ['',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(100)
                ],
                this.codigoNomeNotExistsValidatorService.checkNomeExists(this.data)
            ],
            cor: [''],
            ativo: [true,
                [
                    Validators.required
                ]
            ]
        })
        //se houver dados da máquina preenche formulário
        if (this.data && this.data.id) {
            this.statusForm.patchValue({
                codigo: this.data.codigo,
                nome: this.data.nome,
                cor: this.data.cor,
                ativo: this.data.ativo
            })
        }
    }


    //Salva alterações no cadastro de Status
    salvaStatus() {
        if (this.statusForm.valid && !this.statusForm.pending) {
            const dadosMaquina = this.statusForm.getRawValue() as Status;
            if (this.data && this.data.id) {
                //atualiza dados da máquina
                dadosMaquina.id = this.data.id;
                this.statusService.Update(dadosMaquina)
                    .subscribe(
                        () => this.alertService.success("Status atualizado com sucesso"),
                        () => this.alertService.danger("Erro ao atualizar status")
                    );
            }
            else {
                //insere nova máquina
                this.statusService.Insert(dadosMaquina)
                    .subscribe(
                        () => this.alertService.success("Status cadastrado com sucesso"),
                        () => this.alertService.danger("Erro ao cadastrar status")
                    );
            }
            this.dialogRef.close();
        }
    }

}
