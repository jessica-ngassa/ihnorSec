import { Component } from '@angular/core';
import { ApexNonAxisChartSeries, ApexChart, NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-fraud-types-chart',
  imports: [NgApexchartsModule],
  templateUrl: './fraud-types-chart.html',
  styleUrl: './fraud-types-chart.scss',
})
export class FraudTypesChart {

  series: ApexNonAxisChartSeries = [34, 25, 22, 19];
  labels = ["Identity Fraud", "Duplicates", "Document Mismatch", "Payment Anomaly"];
  colors = ["#EF4444", "#F59E0B", "#FBBF24", "#10B981"]; //TODO USING THIS AS TEMP
  chart: ApexChart = { type: "donut", height: 300 };
  dataLabels = { enabled: false };
  legend = { position: 'right' as const, verticalAlign: 'middle' };
  plotOptions = {
    pie: { donut: { size: '70%' } }
  };
}
