import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AlertModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { RangeSliderComponent } from './range-slider/range-slider.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { FilterScaleComponent } from './filter-scale/filter-scale.component';


@NgModule({
  declarations: [
    AppComponent,
    RangeSliderComponent,
    ProductFilterComponent,
    FilterBarComponent,
    ProductListingComponent,
    FilterScaleComponent
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
