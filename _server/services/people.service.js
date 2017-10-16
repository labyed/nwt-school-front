var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@hapiness/core", "rxjs/Observable", "./people", "rxjs/add/observable/of", "rxjs/add/observable/from", "rxjs/add/observable/throw", "rxjs/add/operator/find", "rxjs/add/operator/findIndex", "rxjs/add/operator/mergeMap"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const core_1 = require("@hapiness/core");
    const Observable_1 = require("rxjs/Observable");
    const people_1 = require("./people");
    require("rxjs/add/observable/of");
    require("rxjs/add/observable/from");
    require("rxjs/add/observable/throw");
    require("rxjs/add/operator/find");
    require("rxjs/add/operator/findIndex");
    require("rxjs/add/operator/mergeMap");
    let PeopleService = class PeopleService {
        /**
         * Class constructor
         */
        constructor() {
            this._people = people_1.PEOPLE.map(person => Object.assign(person, {
                entryDate: this._parseDate(person.entryDate),
                birthDate: this._parseDate(person.birthDate)
            }));
        }
        /**
         * Returns all existing people in the list
         *
         * @returns {Observable<any[]>}
         */
        listAll() {
            return Observable_1.Observable.of(this._people);
        }
        /**
         * Returns randomly one people of the list
         *
         * @returns {Observable<any>}
         */
        random() {
            return Observable_1.Observable.of(this._people[Math.round(Math.random() * this._people.length)]);
        }
        /**
         * Returns one people of the list matching id in parameter
         *
         * @param {string} id of the people
         *
         * @returns {Observable<any>}
         */
        one(id) {
            return Observable_1.Observable.from(this._people)
                .find(_ => _.id === id)
                .flatMap(_ => !!_ ?
                Observable_1.Observable.of(_) :
                Observable_1.Observable.throw(new Error(`People with id '${id}' not found`)));
        }
        /**
         * Check if person already exists and add it in people list
         *
         * @param person to create
         *
         * @returns {Observable<any>}
         */
        create(person) {
            return Observable_1.Observable.from(this._people)
                .find(_ => _.lastname.toLowerCase() === person.lastname.toLowerCase() &&
                _.firstname.toLowerCase() === person.firstname.toLowerCase())
                .flatMap(_ => !!_ ?
                Observable_1.Observable.throw(new Error(`People with lastname '${person.lastname}' and firstname '${person.firstname}' already exists`)) :
                this._addPerson(person));
        }
        /**
         * Update a person in people list
         *
         * @param {string} id of the person to update
         * @param person data to update
         *
         * @returns {Observable<any>}
         */
        update(id, person) {
            return this._findPeopleIndexOfList(id)
                .flatMap(_ => {
                Object.assign(this._people[_], person);
                return Observable_1.Observable.of(this._people[_]);
            });
        }
        /**
         * Deletes on person in people list
         *
         * @param {string} id of the person to delete
         *
         * @returns {Observable<any>}
         */
        delete(id) {
            return this._findPeopleIndexOfList(id).do(_ => console.log(_))
                .flatMap(_ => {
                this._people.splice(_, 1);
                return Observable_1.Observable.of(this._people);
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
        _findPeopleIndexOfList(id) {
            return Observable_1.Observable.from(this._people)
                .findIndex(_ => _.id === id)
                .flatMap(_ => _ > -1 ?
                Observable_1.Observable.of(_) :
                Observable_1.Observable.throw(new Error(`People with id '${id}' not found`)));
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
        _addPerson(person) {
            person.id = this._createId();
            person.entryDate = this._parseDate('01/03/2016');
            person.birthDate = this._parseDate('02/06/1991');
            this._people = this._people.concat(person);
            return Observable_1.Observable.of(person);
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
        _parseDate(date) {
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
        _createId() {
            return `${new Date().getTime()}`;
        }
    };
    PeopleService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], PeopleService);
    exports.PeopleService = PeopleService;
});
//# sourceMappingURL=people.service.js.map