import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'nwt-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  // private property to store person value
  private _person: any;
  // private property to store delete$ value
  private _delete$: EventEmitter<any>;

  /**
   * Component constructor
   */
  constructor(private _router: Router) {
    this._person = {};
    this._delete$ = new EventEmitter();
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
   * Sets private property _person
   *
   * @param person
   */
  @Input()
  set person(person: any) {
    this._person = person;
  }

  /**
   * Returns private property _delete$
   *
   * @returns {EventEmitter<any>}
   */
  @Output('personDelete')
  get delete$(): EventEmitter<any> {
    return this._delete$;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
  }

  /**
   * Function to emit event to delete current person
   *
   * @param person
   */
  delete(person: any) {
    this._delete$.emit(person);
  }

  /**
   * Function to navigate to manager details
   */
  goToManagerIfExist() {
    Observable
      .of(this._person.managerId)
      .filter(_ => !!_)
      .subscribe(_ => this._router.navigate(['/person', _]));
  }
}
