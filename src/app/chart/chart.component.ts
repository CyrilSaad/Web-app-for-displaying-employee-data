import {Component, Input, OnInit} from '@angular/core';
import * as Highcharts from "highcharts";
import {chartService} from "./chart.service";

export class Employee {
  firstName: string;
  lastName: string;
  team: string;
  seniorityLevel: string;
  employmentDate: Date;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {
  @Input() chartType: string;
  highcharts = Highcharts;
  chartOptions;
  teams: any = [];
  titles = [];
  seniorityTitles = [];
  employeesSeniority: any = [];

  constructor(private chartService: chartService) {
  }

  ngOnInit() {
    this.getChartData();
  }

  getChartData() {
    switch (this.chartType) {
      case 'column':
        this.getTeams();
        break;
      case 'pie':
        this.getEmployeesSeniority();
        break;
    }
  }

  getEmployeesSeniority() {
    this.chartService.fetchEmployeesBySeniority()
      .subscribe(
        response => {
          this.employeesSeniority = response;
        },
        err => {
          console.log(err)
        },
        () => {
          let series = [];
          let prev;
          for (let i = 0; i < this.employeesSeniority.length; i++) {
            let objectSeniority = {
              name: '',
              y: 0
            };//object
            if (!this.seniorityTitles.includes(this.employeesSeniority[i].seniorityLevel)) {
              prev = this.employeesSeniority[i].seniorityLevel;
              objectSeniority.name = this.employeesSeniority[i].seniorityLevel;
              this.seniorityTitles.push(this.employeesSeniority[i].seniorityLevel);
              for (let j = 0; j < this.employeesSeniority.length; j++) {
                if (this.employeesSeniority[j].seniorityLevel === this.employeesSeniority[i].seniorityLevel) {
                  objectSeniority.y++;
                }
              }
            } else continue;

            series.push(objectSeniority);
          } //endForLoop
          this.prepareOptions(this.seniorityTitles, series)

        }
      )
  }

  getTeams() {
    this.chartService.fetchTeams().subscribe(
      response => {
        this.teams = response;
      },
      err => {
        console.log(err);
      },
      () => {
        let series = [];
        for (let i = 0; i < this.teams.length; i++) {
          let objectTeam = {
            name: '',
            data: []
          };
          this.titles.push(this.teams[i]._id);
          objectTeam.name = this.teams[i]._id;
          objectTeam.data.push(this.teams[i].employees.length);
          series.push(objectTeam);
        }
        this.prepareOptions(this.titles, series);

      }
    );

  }

  prepareOptions(title, series) {
    switch (this.chartType) {
      case 'column':
        this.chartOptions = {
          chart: {
            type: 'column',
          },
          colors: ['#34ebd2', '#3a34eb', '#32a899'],
          credits: {
            enabled: false
          },
          legend: {
            align: 'center',
            verticalAlign: 'top',
            layout: 'horizontal',
            x: 0,
            y: 0
          },
          title: {
            text: 'Team',
            align: screenLeft,
            padding: 60,
            style: {
              fontWeight: 'bold',

              fontSize: '1.5vw'
            }
          },
          xAxis: {
            categories: " "
          },
          yAxis: {
            title: {
              text: ""
            }
          },
          series: series
        };

        break;
      case 'pie':
        this.chartOptions = {
          chart: {
            type: 'pie',
          },
          title: {
            text: 'Seniority',
            align: screenLeft,
            style: {
              fontWeight: 'bold',
              fontSize: '1.5vw'
            }

          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          }, credits: {
            enabled: false
          },
          series: [{
            name: 'Seniority',
            innerSize: '45%',
            data: series
          }]
        };

        break;
    }
  }

}
