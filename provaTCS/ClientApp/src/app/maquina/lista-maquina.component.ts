import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaquinaService } from "./maquina.service";
import { Maquina } from "./Maquina";

@Component({
    templateUrl:"./lista-maquina.component.html"
})
export class ListaMaquinaComponent implements OnInit {

    displayedColumns: string[] = ['nome', 'ativo'];
    dataSource: any;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private maquinaService: MaquinaService
    ) { }

    recuperaMaquinas() {
        console.log("aqui");
        this.maquinaService.getAll()
            .subscribe(data => {
                console.log(data);
                this.dataSource = new MatTableDataSource<Maquina>(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },error=> console.log(error))
    }

    ngOnInit(): void {
        this.recuperaMaquinas();
    }

}
