import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ListaMaquinaComponent } from "./maquina/lista-maquina.component";
import { ListaStatusComponent } from "./status/lista-status.component";
import { DashboardMaquinasComponent } from "./DashboardMaquinas/dashboard-maquinas.component";

const routes = [
    {
        path: '',
        patthMatch: 'full',
        component: DashboardMaquinasComponent
    },
    {
        path: 'ListaMaquinas',
        component: ListaMaquinaComponent
    },
    {
        path: 'ListaStatus',
        component: ListaStatusComponent
    },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
