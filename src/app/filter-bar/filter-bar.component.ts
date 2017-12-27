import { Component, EventEmitter, OnInit, Input, Output} from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {

  @Input()
  public stepArray:any;

  @Input()
  public currentStep:any;

  @Output()
  public stepChanged:EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  changeStep(step) {
    this.stepChanged.emit(step);
  }


  getSelectionFromRange(range:any) {
    let selection = [];
    range.forEach(function(option, index){
      if (option.selected){
        selection.push(option.title);
      }
    });
    return selection.join();
  }

}
