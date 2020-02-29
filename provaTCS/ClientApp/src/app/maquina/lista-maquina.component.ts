import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { MaquinaService } from "./maquina.service";
import { Maquina } from "./Maquina";
import { EditMaquinaComponent } from "./edit-maquina.component";

@Component({
    templateUrl: "./lista-maquina.component.html",
    styleUrls:["lista-maquina.component.css"]
})
export class ListaMaquinaComponent implements OnInit {

    displayedColumns: string[] = ['nome', 'ativo', 'id'];
    dataSource: any;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private maquinaService: MaquinaService,
        public dialog: MatDialog
    ) { }

    recuperaMaquinas() {
        this.maquinaService.getAll()
            .subscribe(data => {
                this.dataSource =  new MatTableDataSource<Maquina>(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },error=> console.log(error))
    }

    ngOnInit(): void {
        this.recuperaMaquinas();
    }


    //Filtro
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    //Abre dialog para edição da máquina
    visualizaMaquina(maquina: Maquina) {
        const dialogRef = this.dialog.open(EditMaquinaComponent, {
            width: '33%',
            data: maquina,
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            this.recuperaMaquinas();
        });  
    }

    novaMaquina() {
        const dialogRef = this.dialog.open(EditMaquinaComponent, {
            width: '33%',
            data: null,
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            this.recuperaMaquinas();
        });  
    }
}
