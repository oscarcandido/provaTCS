import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from '@angular/material/checkbox';


import { EditMaquinaComponent } from "./edit-maquina.component";
import { ListaMaquinaComponent } from "./lista-maquina.component";
import { AlertModule } from "../shared/components/alert/alert.module";

@NgModule({
    declarations: [
        ListaMaquinaComponent,
        EditMaquinaComponent
    ],
    entryComponents:[EditMaquinaComponent],
    imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        MatTooltipModule,
        MatSortModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatCardModule,
        MatCheckboxModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule,
    ],
    exports: [
       ListaMaquinaComponent,
    ]
})
export class MaquinaModule {}
