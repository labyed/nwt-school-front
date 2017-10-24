import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../shared/people-service/people.service';

import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'nwt-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  // private property to store person value
  private _person: any;

  /**
   * Component constructor
   */
  constructor(private _peopleService: PeopleService) {
    this._person = {};
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
    this._peopleService
      .fetch()
      .filter(_ => _.length > 0)
      .defaultIfEmpty([{}])
      .subscribe((persons: any[]) => this._person = persons.shift());
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
