import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'app-swach',
    templateUrl: './swatch.component.html',
    styleUrls: ['./swatch.component.scss'],
    standalone: false
})
export class SwatchComponent {

  @Input() Name = ""
  
  @Input() get BackgroundClass(){
    return this._backgroundClass
  }
  set BackgroundClass(value: string){
    this._backgroundClass = value
  }
  private _backgroundClass: string = ""
  rgbString: string = ""
  hexString: string = ""

  getRGBColorValue(id: string){
    const e = document.getElementById(id)
    let rgbString = window.getComputedStyle(e!, null).backgroundColor
    rgbString = rgbString.replace("rgb(", "")
    rgbString = rgbString.replace(")", "")
    return rgbString
  }

  getHexColorValue(id: string) {
    let rgbString = this.getRGBColorValue(id)
    let rgbArray = rgbString.split(",")
    return "#" + this.componentToHex(rgbArray[0]).toLocaleUpperCase() + this.componentToHex(rgbArray[1]).toLocaleUpperCase() + this.componentToHex(rgbArray[2]).toLocaleUpperCase()
  }
  componentToHex(c: string) {
      var hex = parseInt(c).toString(16);
      return hex.length == 1 ? "0" + hex : hex;
  }
}
