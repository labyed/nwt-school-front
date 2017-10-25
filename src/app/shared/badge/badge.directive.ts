import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Directive({
  selector: '[nwtBadge]'
})
export class BadgeDirective implements OnInit {
  // private property to store person value
  private _person: any;

  /**
   * Component constructor
   */
  constructor(private _el: ElementRef, private _rd: Renderer2) {
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
   * OnInit implementation
   */
  ngOnInit() {
    Observable
      .of(this._person)
      .filter(_ => !!_ && !!_.isManager)
      .subscribe(_ =>
        this._rd.setProperty(this._el.nativeElement, 'innerHTML', '<i class="material-icons">supervisor_account</i>'));
  }
}
