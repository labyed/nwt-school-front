import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'nwt-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  // private property to store people value
  private _people: any[];
  // private property to store all backend URLs
  private _backendURL: any;

  /**
   * Component constructor
   */
  constructor(private _http: HttpClient) {
    this._people = [];
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`);
  }

  /**
   * Returns private property _people
   *
   * @returns {any[]}
   */
  get people(): any[] {
    return this._people;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._http.get(this._backendURL.allPeople)
      .flatMap(_ => !!_ ? Observable.of(_) : Observable.of([]))
      .subscribe((people: any[]) => this._people = people);
  }

  /**
   * Function to delete one person
   *
   * @param person
   */
  delete(person: any) {
    this._http.delete(this._backendURL.onePeople.replace(':id', person.id))
      .flatMap(_ => !!_ ? Observable.of(_) : Observable.of([]))
      .subscribe( (people: any[]) => this._people = people);
  }
}
