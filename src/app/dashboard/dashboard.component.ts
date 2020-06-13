import {Component, Inject, Input, OnInit} from '@angular/core';
import {chartService} from "../chart/chart.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  widgetType: string;
  constructor(private chartService: chartService) { }

  ngOnInit() {
    // this.routeP
  }

}
