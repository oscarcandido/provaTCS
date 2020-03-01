import { NgModule } from "@angular/core";
import { AlertModule } from "../shared/components/alert/alert.module";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatGridListModule } from '@angular/material/grid-list';

import { DashboardMaquinasComponent } from "./dashboard-maquinas.component";
import { DisplayMaquinaComponent } from "./DisplayMaquina/display-maquina.component";

@NgModule({
    declarations: [
        DashboardMaquinasComponent,
        DisplayMaquinaComponent
    ],
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
        MatGridListModule
    ],
    exports: [
        DashboardMaquinasComponent,
        DisplayMaquinaComponent
    ]
})
export class DashboardMaquinasModule { }
