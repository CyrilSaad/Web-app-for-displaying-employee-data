import {Component, OnInit} from '@angular/core';
import {chartService} from "../chart/chart.service";
import { DatePipe } from "@angular/common";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.css'],
  providers: [DatePipe]
})
export class AppTableComponent implements OnInit {
  employees: any = [];
  cols: any[];
  names = [];
  page;
  constructor(private chartService: chartService,
              private dp: DatePipe,
              private route: ActivatedRoute) {
  }

  initTable(): void {
    this.chartService.pageIndex = this.page;
    this.chartService.fetchTableData(5).subscribe(
      response => {
        this.employees = response;
      },
      err => {
        console.log(err)
      },
      () => {
        let fullName = [];
        for (let i = 0; i < this.employees.length; i++) {
          fullName.push(this.employees[i].firstName + " " + this.employees.lastName);
        }
        this.names = fullName;
        return this.employees;
      }
    );
    this.cols = [
      {field: 'firstName', header: 'First Name'},
      {field: 'lastName', header: 'Last Name'},
      {field: 'team', header: 'Team'},
      {field: 'seniorityLevel', header: 'Seniority'},
      {field: 'employmentDate', header: 'Joined at', type: this.dp, dateFormat: 'mediumDate'},
    ];
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.page = params.page;
    });
    this.initTable();
  }

}
