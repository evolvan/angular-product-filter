import { Component, ElementRef, EventEmitter, OnInit, Inject, Input, Output, OnChanges} from '@angular/core';

declare var jQuery:any;

@Component({
  selector: 'app-filter-scale',
  templateUrl: './filter-scale.component.html',
  styleUrls: ['./filter-scale.component.css']
})
export class FilterScaleComponent implements OnInit {

  elementRef: ElementRef;
  @Input() pointerValue:number;
  @Input() pointerMax:number;
  @Input() labels:any;
  @Output() clickHandle:EventEmitter<any> = new EventEmitter();
  
	private resetting:boolean = false;
	
  constructor(@Inject(ElementRef) elementRef: ElementRef) {
     this.elementRef = elementRef;
  }
  			  
  ngOnInit() {

  }

  segmentClicked(index){
    this.clickHandle.emit(index);
  }

  ngOnChanges(changes) {
    let per = (this.pointerValue / this.pointerMax)*100;
	var scale = this.elementRef.nativeElement;
    if (!this.resetting){
	  jQuery(scale).find(".ruler-pointer").css('left', per + '%');
  	} else {
		this.resetting = false;
	}
	console.log(this.pointerValue, this.pointerMax, per);
  }

}
