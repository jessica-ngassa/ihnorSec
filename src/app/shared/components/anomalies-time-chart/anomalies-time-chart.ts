import { Component } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, NgApexchartsModule, ApexStroke, ApexXAxis, ApexMarkers } from 'ng-apexcharts';

@Component({
  selector: 'app-anomalies-time-chart',
  imports: [NgApexchartsModule],
  templateUrl: './anomalies-time-chart.html',
  styleUrl: './anomalies-time-chart.scss',
})
export class AnomaliesTimeChart {

  series: ApexAxisChartSeries = [{ name: "Anomalies", data: [45, 52, 38, 65, 48] }];
  chart: ApexChart = { type: "line", height: 250, toolbar: { show: false } };
  stroke: ApexStroke = { curve: "smooth", width: 3 };
  xaxis: ApexXAxis = { categories: ["Jan", "Feb", "Mar", "Apr", "May"] };
  markers: ApexMarkers = { size: 4, colors: ['#FBBF24'] }; // TODO TEM COLOR TO MATCH DESIGN
}
