import { Component,OnInit } from '@angular/core';
import { MerchantService } from '../services/merchant/merchant.service';
import { MerchantList } from '../merchant-list/merchant-list.component';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTooltip,
  ApexXAxis,
  ApexLegend,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexStroke
} from "ng-apexcharts";
import { auto } from '@popperjs/core';



@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit{
  selectedRow!: MerchantList | null;
  
  chartSeries:ApexAxisChartSeries=[
    {
      name: "Sales profit",
      type: "column",
      data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6, 4.4, 3.6,2.4, 1.6]
    },
    {
      name: "Products sold",
      type: "column",
      data: [5, 9, 6, 10, 12, 15, 16, 5, 14, 7, 5, 10]
    },
    {
      name: "Customer purchasing power",
      type: "line",
      data: [20, 29, 37, 36, 44, 45, 50, 58, 60, 40, 80, 40]
    }
  ]
  yearSeries:ApexAxisChartSeries=[
    {
      name: "Sales profit",
      type: "column",
      data: [50, 60, 58, 65,69, 55, 80, 65]
    },
    {
      name: "Products sold",
      type: "column",
      data: [52, 96, 65, 110, 120, 154, 164, 50]
    },
    {
      name: "Customer purchasing power",
      type: "line",
      data: [240, 350, 460, 480, 520, 560, 600, 650]
    }
  ]
  chartDetails: ApexChart={
    height: auto,
    type: "line",
    stacked: false
  }

  chartLabels:ApexDataLabels={
    enabled: false
  }
  chartStroke:ApexStroke= {
    width: [1, 1,4]
  }
  
  chartAxis:ApexXAxis= {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  }
  yearAxis:ApexXAxis= {
    categories: ['2016', '2017', '2018', '2019', '2020', '2021',
     '2022', '2023']
  }
  chartYaxis:ApexYAxis[]=[
    {
      axisTicks: {
        show: true
      },
      axisBorder: {
        show: true,
        color: "#008FFB"
      },
      labels: {
        style: {
        colors: "#008FFB"
        }
      },
      title: {
        text: "Sales profit (RM, thousand)",
        style: {
          color: "#008FFB"
        }
      },
      tooltip: {
        enabled: true
      }
    },
    {
      seriesName: "Products sold",
      opposite: true,
      axisTicks: {
        show: true
      },
      axisBorder: {
        show: true,
        color: "#00E396"
      },
      labels: {
        style: {
        colors: "#00E396"
        }
      },
      title: {
        text: "Number of products sold",
        style: {
          color: "#00E396"
        }
      }
    },
    {
      seriesName: "Customer purchasing power",
      opposite: true,
      axisTicks: {
        show: true
      },
      axisBorder: {
        show: true,
        color: "#FEB019"
      },
      labels: {
        style: {
          colors: "#FEB019"
        }
      },
      title: {
        text: "Customer purchasing power (RM)",
        style: {
          color: "#FEB019"
        }
      }
    }
  ]

  chartTitle:ApexTitleSubtitle= {
    text: "Monthly Sales Report",
    align: "left",
    offsetX: 110
  }
  yearTitle:ApexTitleSubtitle= {
    text: "Yearly Sales Report",
    align: "left",
    offsetX: 110
  }
  chartToolTip:ApexTooltip={
    fixed: {
      enabled: true,
      position: "topLeft",
      offsetY: 30,
      offsetX: 60
    }
  }
  chartLegend:ApexLegend={
    horizontalAlign: "left",
    offsetX: 40
  }
  constructor(private merchantService: MerchantService) {
    this.merchantService.getSelectedRowData().subscribe(data => {
      this.selectedRow = data;
    });
    
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  }



