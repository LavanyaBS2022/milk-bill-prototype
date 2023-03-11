import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from "./../angular.material.module";
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import * as _moment from 'moment';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS, DateTimeAdapter, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule, MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
import { Common } from '../shared/service/common/common';

import {
  ListFilterPipe
} from './pipes';

import {
  UpperCaseInputDirective,
  EqualValidator,
  NumbersOnlyDirective
} from './directive';

const moment = (_moment as any).default ? (_moment as any).default : _moment;

const MY_MOMENT_FORMATS = {
  parseInput: 'DD-MM-YYYY',
  fullPickerInput: 'DD-MM-YYYY',
  datePickerInput: 'DD-MM-YYYY',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};

@NgModule({
  imports: [
    CommonModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AngularMaterialModule,
  ],
  declarations: [ListFilterPipe, UpperCaseInputDirective, EqualValidator, NumbersOnlyDirective],
  exports: [ListFilterPipe, UpperCaseInputDirective, EqualValidator, NumbersOnlyDirective],
  providers: [
    { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS },
    Common
  ]
})
export class SharedModule { }
