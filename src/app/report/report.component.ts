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
import { LoginService } from '../services/login/login.service';
import { Merchant } from '../shared/models/merchant.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit{
  selectedRow!: MerchantList | null;
  userId='';
  merchant:Merchant;
  name='';
  id=0;
  constructor(private merchantService: MerchantService,
    private loginService:LoginService, private activatedRoute:ActivatedRoute) {
    
    this.merchantService.getSelectedRowData().subscribe(data => {
      this.selectedRow = data;
    });
  }
  ngOnInit(): void {
    
    if(this.loginService.getUserType()==='merchant'){
      this.userId=this.loginService.getUserId();
    }else{
      this.userId=this.selectedRow.userId;
    }
    this.merchantService.getMerchantById(this.userId).subscribe(merchant => {
      this.merchant = merchant;
      this.name = merchant.name;
      this.id = merchant.id;
      const purchasingPower = parseFloat((this.merchant.revenue / this.merchant.productsSold).toFixed(2));
      this.chartSeries[0].data[11] = parseFloat(this.merchant.revenue.toFixed(2));
      this.chartSeries[1].data[11] = this.merchant.productsSold;
      this.chartSeries[2].data[11] = purchasingPower;

      this.yearSeries[0].data[7] = parseFloat(this.merchant.revenue.toFixed(2));
      this.yearSeries[1].data[7] = this.merchant.productsSold;
      this.yearSeries[2].data[7] = purchasingPower;
    });
  }
  chartSeries:ApexAxisChartSeries=[
    {
      name: "Sales profit",
      type: "column",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0]
    },
    {
      name: "Products sold",
      type: "column",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: "Customer purchasing power",
      type: "line",
      data: [0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ]
  yearSeries:ApexAxisChartSeries=[
    {
      name: "Sales profit",
      type: "column",
      data: [0, 0, 0, 0,0, 0, 0, 0]
    },
    {
      name: "Products sold",
      type: "column",
      data: [0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: "Customer purchasing power",
      type: "line",
      data: [0, 0, 0, 0, 0, 0, 0, 0]
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
        text: "Sales profit (RM)",
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
  
  

  }



