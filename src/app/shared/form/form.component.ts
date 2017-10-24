import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'nwt-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  // private property to store cancel$ value
  private _cancel$: EventEmitter<any>;
  // private property to store add$ value
  private _add$: EventEmitter<any>;
  // private property to store photo src
  private _photo: string;
  // private property to store isManager flag
  private _isManager: boolean;

  /**
   * Component constructor
   */
  constructor() {
    this._add$ = new EventEmitter();
    this._cancel$ = new EventEmitter();
    this._photo = 'https://randomuser.me/api/portraits/lego/6.jpg';
    this._isManager = false;
  }

  /**
   * Returns private property _cancel$
   *
   * @returns {EventEmitter<any>}
   */
  @Output('cancel') get cancel$(): EventEmitter<any> {
    return this._cancel$;
  }

  /**
   * Returns private property _add$
   *
   * @returns {EventEmitter<any>}
   */
  @Output('personAdd') get add$(): EventEmitter<any> {
    return this._add$;
  }

  /**
   * Returns private property _photo
   *
   * @returns {string}
   */
  get photo(): string {
    return this._photo;
  }

  /**
   * Returns private property _isManager
   *
   * @returns {boolean}
   */
  get isManager(): boolean {
    return this._isManager;
  }

  /**
   * Set private property _isManager
   *
   * @param {boolean} isManager
   */
  set isManager(isManager: boolean) {
    this._isManager = this.isManager;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
  }

  /**
   * Function to emit event to cancel process
   */
  cancel() {
    this._cancel$.emit();
  }

  /**
   * Function to emit event to add new person
   *
   * @param person
   */
  add(person: any) {
    this._add$.emit(person);
  }
}
