import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
    selector: 'app-swach',
    templateUrl: './swatch.component.html',
    styleUrls: ['./swatch.component.scss'],
    standalone: false
})
export class SwatchComponent implements AfterViewInit{

  element: HTMLElement
  rgbString: string = ""
  hexString: string = ""
  @Input() Name = ""

  private _backgroundClass: string = ""
  @Input() get BackgroundClass(){
    return this._backgroundClass
  }
  set BackgroundClass(value: string){
    this._backgroundClass = value
  }

  constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef) {
    this.element = elementRef.nativeElement
  }

  ngAfterViewInit(): void {
    this.rgbString = this.getRGBColorValue()
    this.hexString = this.getHexColorValue(this.element.id)
    this.cdr.detectChanges();
  }

  getRGBColorValue(): string{
    let rgbString = window.getComputedStyle(this.elementRef.nativeElement.children[0]).backgroundColor
    rgbString = rgbString.replace("rgb(", "")
    rgbString = rgbString.replace(")", "")
    return rgbString
  }

  getHexColorValue(id: string): string{
    let rgbArray = this.rgbString.split(",")
    return "#" + this.componentToHex(rgbArray[0]).toLocaleUpperCase() + this.componentToHex(rgbArray[1]).toLocaleUpperCase() + this.componentToHex(rgbArray[2]).toLocaleUpperCase()
  }

  componentToHex(c: string): string {
      var hex = parseInt(c).toString(16);
      return hex.length == 1 ? "0" + hex : hex;
  }
}
