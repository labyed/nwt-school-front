import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'nwt-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  // private property to store person value
  private _person: any;
  // private property to store all backend URLs
  private _backendURL: any;

  /**
   * Component constructor
   */
  constructor(private _http: HttpClient) {
    this._person = {};
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
   * Returns private property _person
   *
   * @returns {any}
   */
  get person(): any {
    return this._person;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._http.get(this._backendURL.allPeople)
      .subscribe((persons: any[]) => this._person = persons.shift());
  }

  /**
   * Returns random people
   */
  random() {
    this._http.get(this._backendURL.randomPeople)
      .subscribe((person: any) => this._person = person);
  }
}
