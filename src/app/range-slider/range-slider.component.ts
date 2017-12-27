import { Component, ElementRef, Inject, OnInit, EventEmitter, Input, Output } from '@angular/core';

declare var jQuery:any;

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.css']
})
export class RangeSliderComponent implements OnInit {
  elementRef: ElementRef;
  slideValue: number;

  @Output() onSlide = new EventEmitter<number>();

  constructor(@Inject(ElementRef) elementRef: ElementRef) {
     this.elementRef = elementRef;
  }

  ngOnInit() {
    var obj = this;
    var slider = this.elementRef.nativeElement;
    jQuery(slider).find(".slider").slider({
      min: 0,
      max: 600,
      value: 1,
      slide: (event, ui) => {
        obj.slideValue = ui.value;
        obj.onSlide.emit(obj.slideValue);
      }
    });
  }

  reset() {
    var obj = this;
    var slider = this.elementRef.nativeElement;
    jQuery(slider).find(".slider").slider("value", 1);
  }




}
