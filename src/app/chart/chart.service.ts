import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {observable, Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {Employee} from "./chart.component";

@Injectable({providedIn: 'root'})
export class chartService {
  constructor(private http: HttpClient) {
  }

  fetchTeams() {
    let teams;
    return new Observable(observable => {
      this.http.get('http://localhost:3000/EmployeesbyTeam')
        .pipe(map(responseData => {
            const Arr = [];
            for (const key in responseData) {
              if (responseData.hasOwnProperty(key)) {
                Arr.push({...responseData[key], id: key})
              }
            }
            return Arr;
          })
        )
        .subscribe(response => (teams = response),
          error => {
            observable.error(error);
          },
          () => {
            observable.next(teams);
            observable.complete();
          }
        );

    });
  }
getEmployees() {
  let teams;
  return new Observable(observable => {
    this.http.get<Employee>('http://localhost:3000/Employees')
      .pipe(map(responseData => {
          const Arr = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              Arr.push({...responseData[key], id: key})
            }
          }
          return Arr;
        })
      )
      .subscribe(response => (teams = response),
        error => {
          observable.error(error);
        },
        () => {
          observable.next(teams);
          observable.complete();
        }
      );

  });
}
  fetchEmployeesBySeniority() {
    let teams;
    return new Observable(observable => {
      this.http.get<Employee>('http://localhost:3000/EmployeesByLevel')
        .pipe(map(responseData => {
            const Arr = [];
            for (const key in responseData) {
              if (responseData.hasOwnProperty(key)) {
                Arr.push({...responseData[key], id: key})
              }
            }
            return Arr;
          })
        )
        .subscribe(response => (teams = response),
          error => {
            observable.error(error);
          },
          () => {
            observable.next(teams);
            observable.complete();
          }
        );

    });
  }
 pageIndex = 10;
  fetchTableData(f) {
    let teams;
    return new Observable(observable => {

      this.http.get(('http://localhost:3000/EmployeesByDate?page='+f))
        .pipe(map(responseData => {
            const Arr = [];
            for (const key in responseData) {
              if (responseData.hasOwnProperty(key)) {
                Arr.push({...responseData[key], id: key})
              }
            }
            return Arr;
          })
        )
        .subscribe(response => (teams = response),
          error => {
            observable.error(error);
          },
          () => {
            observable.next(teams);
            observable.complete();
          }
        );

    });
  }
}
