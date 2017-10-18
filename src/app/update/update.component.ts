import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogComponent } from '../shared/dialog/dialog.component';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'nwt-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  // private property to store all backend URLs
  private _backendURL: any;
  // private property to store dialog reference
  private _peopleDialog: MatDialogRef<DialogComponent>;

  /**
   * Component constructor
   */
  constructor(private _route: ActivatedRoute, private _router: Router, private _http: HttpClient, private _dialog: MatDialog) {
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
   * OnInit implementation
   */
  ngOnInit() {
    this._route.params
      .map((params: any) => params.id)
      .flatMap((id: string) => this._fetchOne(id))
      .subscribe((person: any) => {
        this._peopleDialog = this._dialog.open(DialogComponent, {
          width: '500px',
          disableClose: true,
          data: person
        });

        // subscribe to afterClosed observable to set dialog status and do process
        this._peopleDialog.afterClosed()
          .filter(_ => !!_)
          .flatMap(_ => this._update(_))
          .subscribe(null, null, () => this._router.navigate(['/people']));
      });
  }

  /**
   * Update a person in the list
   *
   * @param person to update
   *
   * @returns {Observable<any[]>}
   *
   * @private
   */
  private _update(person: any): Observable<any[]> {
    const requestOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this._http.put(this._backendURL.onePeople.replace(':id', person.id), person, requestOptions);
  }

  /**
   * Returns an observable fetchs one person by id
   *
   * @param id
   *
   * @returns {Observable<any>}
   *
   * @private
   */
  private _fetchOne(id: string): Observable<any> {
    return this._http.get(this._backendURL.onePeople.replace(':id', id));
  }
}
