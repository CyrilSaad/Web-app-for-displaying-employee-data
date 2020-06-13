import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WidgetComponent } from './widget/widget.component';
import { AppTableComponent } from './app-table/app-table.component';
import { ChartComponent } from './chart/chart.component';
import {TableModule} from 'primeng/table';
import {HighchartsChartModule} from "highcharts-angular";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import { EmployeesListComponent } from './employees-list/employees-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WidgetComponent,
    AppTableComponent,
    ChartComponent,
    EmployeesListComponent
  ],
  imports: [
    BrowserModule,
    HighchartsChartModule,
    FormsModule,
    TableModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
