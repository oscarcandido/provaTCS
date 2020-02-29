import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl:"./lista-maquina.component.html"
})
export class ListaMaquinaComponent implements OnInit {

    displayedColumns: string[] = ['nome', 'ativo'];
    dataSource: any;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

}
