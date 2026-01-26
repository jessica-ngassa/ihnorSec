import { Component } from '@angular/core';
import { ApexChart, NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-fraud-score-chart',
  imports: [NgApexchartsModule],
  templateUrl: './fraud-score-chart.html',
  styleUrl: './fraud-score-chart.scss',
})
export class FraudScoreChart {
  series: ApexAxisChartSeries = [
    { name: 'Count',
       data: [8000, 3200, 1000, 500, 200]
      }
    ];
  chart: ApexChart =
  { type: 'bar',
    height: 300,
    toolbar: { show: false }
  };
  xaxis: ApexXAxis = {
    categories: ['0-20', '21-40', '41-60', '61-80', '81-100']
  };
  yaxis: ApexYAxis = {
     min: 0, max: 10000, tickAmount: 4
    };
  grid = {
    strokeDashArray: 4
  };
}
