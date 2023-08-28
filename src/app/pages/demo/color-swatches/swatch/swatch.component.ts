import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-swach',
  templateUrl: './swatch.component.html',
  styleUrls: ['./swatch.component.scss']
})
export class SwatchComponent {

  @Input() Title = ""
  @Input() get BackgroundClass(){
    return this._backgroundClass
  }

  set BackgroundClass(value: string){
    this._backgroundClass = value
  }

  private _backgroundClass: string = ""
}
