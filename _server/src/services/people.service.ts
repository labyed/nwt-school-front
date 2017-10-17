import { Injectable } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';
import { PEOPLE } from './people';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/find';
import 'rxjs/add/operator/findIndex';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class PeopleService {
    // private property to store all people
    private _people: any[];

    /**
     * Class constructor
     */
    constructor() {
        this._people = PEOPLE.map(person => Object.assign(person, {
            entryDate: this._parseDate(person.entryDate),
            birthDate: this._parseDate(person.birthDate)
        }));
    }

    /**
     * Returns all existing people in the list
     *
     * @returns {Observable<any[]>}
     */
    listAll(): Observable<any[]> {
        return Observable.of(this._people);
    }

    /**
     * Returns randomly one people of the list
     *
     * @returns {Observable<any>}
     */
    random(): Observable<any> {
        return Observable.of(this._people[Math.round(Math.random() * this._people.length)]);
    }

    /**
     * Returns one people of the list matching id in parameter
     *
     * @param {string} id of the people
     *
     * @returns {Observable<any>}
     */
    one(id: string): Observable<any> {
        return Observable.from(this._people)
            .find(_ => _.id === id)
            .flatMap(_ => !!_ ?
                Observable.of(_) :
                Observable.throw(new Error(`People with id '${id}' not found`))
            );
    }

    /**
     * Check if person already exists and add it in people list
     *
     * @param person to create
     *
     * @returns {Observable<any>}
     */
    create(person: any): Observable<any> {
        return Observable.from(this._people)
            .find(_ => _.lastname.toLowerCase() === person.lastname.toLowerCase() &&
                _.firstname.toLowerCase() === person.firstname.toLowerCase())
            .flatMap(_ => !!_ ?
                Observable.throw(
                    new Error(`People with lastname '${person.lastname}' and firstname '${person.firstname}' already exists`)
                ) :
                this._addPerson(person)
            );
    }

    /**
     * Update a person in people list
     *
     * @param {string} id of the person to update
     * @param person data to update
     *
     * @returns {Observable<any>}
     */
    update(id: string, person: any): Observable<any> {
        return this._findPeopleIndexOfList(id)
            .flatMap(_ => {
                Object.assign(this._people[_], person);
                return Observable.of(this._people[_]);
            });
    }

    /**
     * Deletes on person in people list
     *
     * @param {string} id of the person to delete
     *
     * @returns {Observable<any>}
     */
    delete(id: string): Observable<any> {
        return this._findPeopleIndexOfList(id).do(_ => console.log(_))
            .flatMap(_ => {
               this._people.splice(_, 1);
                return Observable.of(this._people);
            });
    }

    /**
     * Finds index of array for current person
     *
     * @param {string} id of the person to find
     *
     * @returns {Observable<number>}
     *
     * @private
     */
    private _findPeopleIndexOfList(id: string): Observable<number> {
        return Observable.from(this._people)
            .findIndex(_ => _.id === id)
            .flatMap(_ => _ > -1 ?
                Observable.of(_) :
                Observable.throw(new Error(`People with id '${id}' not found`))
            );
    }

    /**
     * Add person with good data in people list
     *
     * @param person to add
     *
     * @returns {Observable<any>}
     *
     * @private
     */
    private _addPerson(person: any): Observable<any> {
        person.id = this._createId();
        person.entryDate = this._parseDate('01/03/2016');
        person.birthDate = this._parseDate('02/06/1991');
        this._people = this._people.concat(person);

        return Observable.of(person);
    }

    /**
     * Function to parse date and return timestamp
     *
     * @param {string} date to parse
     *
     * @returns {number} timestamp
     *
     * @private
     */
    private _parseDate(date: string): number {
        const dates = date.split('/');
        return (new Date(dates[2] + '/' + dates[1] + '/' + dates[0]).getTime());
    }

    /**
     * Creates a new id
     *
     * @returns {string}
     *
     * @private
     */
    private _createId(): string {
        return `${ new Date().getTime()}`
    }
}
