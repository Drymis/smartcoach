import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { LandingComponent } from './pages/landing/landing.component';
import { FrontofficeComponent } from './frontoffice.component';
import { FrontofficeRoutingModule } from './frontoffice-routing.module';
import { PitchConfiguratorComponent } from './components/landing/pitch-configurator/pitch-configurator.component';

export const MY_CUSTOM_FORMATS = {
  parseInput: 'll',
  fullPickerInput: 'll',
  datePickerInput: 'll',
  timePickerInput: 'll',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'll',
  monthYearA11yLabel: 'MMMM YYYY',
};

@NgModule({
  declarations: [
    FrontofficeComponent,
    LandingComponent,
    PitchConfiguratorComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    FrontofficeRoutingModule,
  ],
  providers: [
  ]
})
export class FrontofficeModule { }
