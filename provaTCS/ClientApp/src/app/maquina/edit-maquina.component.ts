import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";


import { ListaMaquinaComponent } from "./lista-maquina.component";
import { MaquinaService } from "./maquina.service";
import { Maquina } from "./Maquina";
import { AlertService } from "../shared/components/alert/alert.service";
import { NomeNotExistsValidatorService } from "./nome-not-exists.validatorservice.";

@Component({
    templateUrl: "./edit-maquina.component.html",
    providers:[NomeNotExistsValidatorService]
})
export class EditMaquinaComponent implements OnInit{

    maquinaForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private maquinaService: MaquinaService,
        public dialogRef: MatDialogRef<ListaMaquinaComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Maquina,
        private alertService: AlertService,
        private nomeNotExistsValidatorService : NomeNotExistsValidatorService
    ) { }

    ngOnInit(): void {
        //cria formulário de máquina
        this.maquinaForm = this.formBuilder.group({
            nome: ['',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(100)
                ],
                this.nomeNotExistsValidatorService.checkNomeMaquinaExists(this.data)
            ],
            ativo: [true,
                [
                    Validators.required
                ]
            ]
        })
        //se houver dados da máquina preenche formulário
        if (this.data && this.data.id) {
            this.maquinaForm.patchValue({
                nome: this.data.nome,
                ativo: this.data.ativo
            })
        }
    }
    salvaMaquina() {
        console.log(this.maquinaForm.get('nome').errors);
        if (this.maquinaForm.valid && !this.maquinaForm.pending) {
            const dadosMaquina = this.maquinaForm.getRawValue() as Maquina;
            if (this.data && this.data.id) {
                //atualiza dados da máquina
                dadosMaquina.id = this.data.id;
                this.maquinaService.Update(dadosMaquina)
                    .subscribe(
                        () => this.alertService.success("Máquina atualizada com sucesso"),
                        () => this.alertService.danger("Erro ao atualizar máquina")
                    );
            }
            else {
                //insere nova máquina
                this.maquinaService.Insert(dadosMaquina)
                    .subscribe(
                        () => this.alertService.success("Máquina cadastrada com sucesso"),
                        () => this.alertService.danger("Erro ao cadastrar máquina")
                    );
            }
            this.dialogRef.close();
        }
    }

}
