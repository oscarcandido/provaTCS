import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { StatusService } from "./status.service";
import { Status } from "./status";
import { EditStatusComponent } from "./edit-status.component";

@Component({
    templateUrl: "./lista-status.component.html",
    styleUrls:[ "lista-status.component.css"]
})
export class ListaStatusComponent implements OnInit{

    displayedColumns: string[] = ['codigo', 'nome','ativo', 'id'];
    dataSource: any;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private statusService: StatusService,
        public dialog: MatDialog
    ) { }

    recuperaStatus() {
        this.statusService.getAll()
            .subscribe(data => {
                this.dataSource = new MatTableDataSource<Status>(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }, error => console.log(error))
    }

    ngOnInit(): void {
        this.recuperaStatus()
    }

    //Filtro
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    //Abre dialog para edição do Status
    visualizaStatus(status: Status) {
        const dialogRef = this.dialog.open(EditStatusComponent, {
            width: '33%',
            data: status,
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            this.recuperaStatus();
        });
    }
    //Abre dialog para inclusão de máquina
    novoStatus() {
        const dialogRef = this.dialog.open(EditStatusComponent, {
            width: '33%',
            data: null,
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            this.recuperaStatus();
        });
    }

}
