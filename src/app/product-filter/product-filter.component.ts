import { Component, OnInit, ViewChild } from '@angular/core';

// imorting environment SETTINGS
import { environment } from '../../environments/environment';

// importing filter steps
import { SETTINGS } from './product-filter.component.config';

// importing product list
import { PRODUCT_LIST } from './product-list';

import { RangeSliderComponent } from '../range-slider/range-slider.component';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})

export class ProductFilterComponent implements OnInit {
  @ViewChild(RangeSliderComponent)
  private rangeSliderComponent: RangeSliderComponent;
  
  // setting data from static product list
  private productList:any = PRODUCT_LIST

  // setting the filter steps from the static json from separate file
  public setting:any = SETTINGS;
  public stepCounter:number = 0;
  public currentStep:any;
  public filterProcessComplete:boolean = false;
  public filteredData : any;
  private targetIndex:any;
  public slideValue:number;
  public currencyCode = 'INR';
  public pointerMax = 600;
  public filterParam = {
    "price" : [],
    "cpu" : [],
    "memory" : [],
    "disk_space" : [],
    "brand" : []
  };


  // Default setting for the required vars
  constructor() {
    this.targetIndex = [];
    this.currentStep = this.setting.steps[this.stepCounter];
    this.filteredData = this.productList;
  }

  ngOnInit() {}


  // Callback that listen for the
  //slider value change from the range slider component
  sliderFilter(slideValue:number) {
    let obj = this;
    this.slideValue = slideValue;
    if (slideValue <= 150) {
      this.targetIndex = [0];
    } else if(slideValue > 150 && slideValue <= 250){
      this.targetIndex = [0, 1];
    } else if(slideValue <= 350){
      this.targetIndex = [1];
    } else if(slideValue > 350 && slideValue <= 450){
      this.targetIndex = [1, 2];
    } else if(slideValue <= 600){
      this.targetIndex = [2];
    }
    obj.currentStep.range.forEach(function(target, i){
      obj.currentStep.range[i].selected = false;
    });


    obj.targetIndex.forEach(function(target, i){
      obj.currentStep.range[target].selected = true;
    });

  }

  stepChangeCallback(step) {
	this.filterProduct();
    this.filterProcessComplete = false;
    this.stepCounter = step;
    this.currentStep = this.setting.steps[this.stepCounter];
  }



  // to select the options directly from the columns
  filterOptionClicked(index:number){
    this.targetIndex = [index];
    this.nextStep();
  }

  // Did select something wrong? come back.
  prevStep() {
    if (this.stepCounter >= 0) {
      if (this.filterProcessComplete) {
        this.filterProcessComplete = false;
      } else {
        this.stepCounter--;
      }
      this.currentStep = this.setting.steps[this.stepCounter];
      this.targetIndex = [];
      this.filterParam[this.currentStep.filterKey] = [];
      this.filterProduct();
      if (this.stepCounter < 4)
		this.rangeSliderComponent.reset();
	  this.slideValue = 0;
    }

  }

  // Commit the selection, made via either slider or directly clicking columns
  nextStep() {
    let obj = this;
    
    if (!this.filterProcessComplete) {
      this.filterParam[this.currentStep.filterKey] = [];
      this.targetIndex.forEach(function(targetIndex, i){
          let currentOption = obj.currentStep.range[targetIndex];
          currentOption.selected = true;
          obj.filterParam[obj.currentStep.filterKey].push(currentOption.filterValue);
      });
		
      this.filterProduct();
      this.rangeSliderComponent.reset();
	  this.slideValue = 0;
		
	  if (this.stepCounter < 4) {
        this.currentStep = this.setting.steps[++this.stepCounter];
      } else {
        this.filterProcessComplete = true;
      }
    }
  }

  resetSelection(step) {
    step.range.forEach(function(option, index){
      option.selected = false;
    });
  }

	getSelections(callback){
		let selection = [];
		this.setting.steps.forEach(function(step, i){
			if (!selection[step.filterKey]){
				selection[step.filterKey] = [];
			}
			step.range.forEach(function(option, index){
				if (option.selected) {
					selection[step.filterKey].push(option.filterValue);
				}
			});
		});
		callback(selection);
	}

  // finally perform the filteration on the available product list
  filterProduct() {
    let obj = this;
	obj.getSelections(function(filterParam){
		
		// clear the prefiltered data
		obj.filteredData = [];


		obj.productList.forEach(function(product, index){
		  let allow = true;

		  // filter against price
		  if (filterParam.price.length != 0 && allow) {
			allow = false;
			filterParam.price.forEach(function(price, index){
			  if (product.price <= price) {
				allow = true;
			  }
			});
		  }

		  // filter against memory
		  if (filterParam.memory.length != 0 && allow) {
			allow = false;
			filterParam.memory.forEach(function(memory, index){
			  if (product.features.memory == memory) {
				allow = true;
			  }
			});
		  }

		  // filter against cpu
		  if (filterParam.cpu.length != 0 && allow) {
			allow = false;
			filterParam.cpu.forEach(function(cpu, index){
			  if (product.features.cpu == cpu) {
				allow = true;
			  }
			});
		  }

		  // filter against disk_space
		  if (filterParam.disk_space.length != 0 && allow) {
			allow = false;
			filterParam.disk_space.forEach(function(disk_space, index){
			  if (product.features.disk_space == disk_space) {
				allow = true;
			  }
			});
		  }

		  // filter against brand
		  if (filterParam.brand.length != 0 && allow) {
			allow = false;
			filterParam.brand.forEach(function(brand, index){
			  if (product.brand == brand) {
				allow = true;
			  }
			});
		  }

		  if (allow) {
			obj.filteredData.push(product);
		  }


		});
	});



  }


}
