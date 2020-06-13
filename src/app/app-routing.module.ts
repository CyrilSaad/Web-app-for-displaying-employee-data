import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {EmployeesListComponent} from "./employees-list/employees-list.component";


const appRoutes: Routes = [
  {path:'', redirectTo:'home', pathMatch: 'full' },
  {path: 'home', component: DashboardComponent},
  {path:'employees', component: EmployeesListComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
