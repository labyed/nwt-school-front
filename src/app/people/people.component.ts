import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogComponent } from '../shared/dialog/dialog.component';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/filter';

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
  // private property to store dialogStatus value
  private _dialogStatus: string;
  // private property to store dialog reference
  private _peopleDialog: MatDialogRef<DialogComponent>;

  /**
   * Component constructor
   */
  constructor(private _http: HttpClient, private _dialog: MatDialog) {
    this._people = [];
    this._backendURL = {};
    this._dialogStatus = 'inactive';

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
   * Returns private property _dialogStatus
   *
   * @returns {string}
   */
  get dialogStatus(): string {
    return this._dialogStatus;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._getAll().subscribe((people: any[]) => this._people = people);
  }

  /**
   * Function to delete one person
   *
   * @param person
   */
  delete(person: any) {
    this._http.delete(this._backendURL.onePeople.replace(':id', person.id))
      .filter(_ => !!_)
      .defaultIfEmpty([])
      .subscribe((people: any[]) => this._people = people);
  }

  /**
   * Function to display modal
   */
  showDialog() {
    // set dialog status
    this._dialogStatus = 'active';

    // open modal
    this._peopleDialog = this._dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._peopleDialog.afterClosed()
      .filter(_ => !!_)
      .flatMap(_ => this._add(_))
      .subscribe(
        (people: any[]) => this._people = people,
        _ => this._dialogStatus = 'inactive',
        () => this._dialogStatus = 'inactive'
      );
  }

  /**
   * Add new person and fetch all people to refresh the list
   *
   * @param person to add
   *
   * @returns {Observable<any[]>}
   *
   * @private
   */
  private _add(person: any): Observable<any[]> {
    const requestOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this._http.post(this._backendURL.allPeople, person, requestOptions).flatMap(_ => this._getAll());
  }

  /**
   * Returns Observable of all people
   *
   * @returns {Observable<any[]>}
   *
   * @private
   */
  private _getAll(): Observable<any[]> {
    return this._http.get(this._backendURL.allPeople)
      .filter(_ => !!_)
      .defaultIfEmpty([]);
  }
}
