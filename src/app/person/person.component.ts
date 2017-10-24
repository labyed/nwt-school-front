import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeopleService } from '../shared/people-service/people.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';

@Component({
  selector: 'nwt-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  // private property to store person value
  private _person: any;
  // private property to store flag to know if it's a person
  private _isPerson: boolean;

  /**
   * Component constructor
   */
  constructor(private _peopleService: PeopleService, private _route: ActivatedRoute) {
    this._person = {};
    this._isPerson = false;
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
   * Returns flag to know if we are on a profile or on HP
   *
   * @returns {boolean}
   */
  get isPerson(): boolean {
    return this._isPerson;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    Observable
      .merge(
        this._route.params
          .filter(params => !!params['id'])
          .flatMap(params => this._peopleService.fetchOne(params['id']))
          .do(_ => this._isPerson = true),
        this._route.params
          .filter(params => !params['id'])
          .flatMap(_ => this._peopleService.fetchRandom())
          .do(_ => this._isPerson = false)
      )
      .subscribe((person: any) => this._person = person);
  }

  /**
   * Returns random people
   */
  random() {
    this._peopleService
      .fetchRandom()
      .subscribe((person: any) => this._person = person);
  }
}
