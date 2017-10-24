import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { PeopleService } from '../shared/people-service/people.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'nwt-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  // private property to store people value
  private _people: any[];
  // private property to store dialogStatus value
  private _dialogStatus: string;
  // private property to store dialog reference
  private _peopleDialog: MatDialogRef<DialogComponent>;
  // private property to store view value
  private _view: string;

  /**
   * Component constructor
   */
  constructor(private _router: Router, private _peopleService: PeopleService, private _dialog: MatDialog) {
    this._people = [];
    this._dialogStatus = 'inactive';
    this._view = 'card';
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
   * Returns private property _view
   *
   * @returns {string}
   */
  get view(): string {
    return this._view;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._peopleService
      .fetch()
      .subscribe((people: any[]) => this._people = people);
  }

  /**
   * Function to delete one person
   *
   * @param person
   */
  delete(person: any) {
    this._peopleService
      .delete(person.id)
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
   * Function to switch view
   */
  switchView() {
    this._view = (this._view === 'card') ? 'list' : 'card';
  }

  /**
   * Function to navigate to current person
   *
   * @param person
   */
  navigate(person) {
    this._router.navigate(['/person', person.id]);
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
    return this._peopleService
      .create(person)
      .flatMap(_ => this._peopleService.fetch());
  }
}
