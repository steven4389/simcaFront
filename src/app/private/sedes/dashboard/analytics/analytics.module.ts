import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphicsComponent } from './components/graphics/graphics.component';
import {AnalyticsRouting} from './analytics.routing'

import { PlotlyViaCDNModule } from 'angular-plotly.js';

PlotlyViaCDNModule.plotlyVersion = '1.49.4'; // can be `latest` or any version number (i.e.: '1.40.0')
PlotlyViaCDNModule.plotlyBundle = 'basic'; // optional: can be null (for full) or 'basic', 'cartesian', 'geo', 'gl3d', 'gl2d', 'mapbox' or 'finance'


@NgModule({
  imports: [
    CommonModule,
    AnalyticsRouting,
    PlotlyViaCDNModule, 
  ],
  declarations: [GraphicsComponent]
})
export class AnalyticsModule { }
