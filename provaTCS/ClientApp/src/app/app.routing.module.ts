import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
import { CounterComponent } from "./counter/counter.component";
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
        path: 'counter',
        component: CounterComponent
    },
    {
        path: 'fetch-data',
        component: FetchDataComponent
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
