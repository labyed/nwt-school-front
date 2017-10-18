import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogComponent } from '../shared/dialog/dialog.component';

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

  /**
   * Function to display modal
   */
  showDialog() {
    // set dialog status
    this._dialogStatus = 'active';

    // open modal
    this._peopleDialog = this._dialog.open(DialogComponent, {
      width: '500px',
      data: {}
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._peopleDialog.afterClosed().subscribe(_ => this._dialogStatus = 'inactive');
  }
}
