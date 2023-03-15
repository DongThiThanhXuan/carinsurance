
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Account } from 'src/app/models/account.model';
import { AppConfig } from 'src/app/models/appconfig';
import { Brandvehicle } from 'src/app/models/brandvehicle.model';
import { CountEstimate } from 'src/app/models/countestimate.model';
import { CountVehicle } from 'src/app/models/countvehicle.model';
import { Estimate } from 'src/app/models/estimate.model';
import { AccountService } from 'src/app/services/account.service';
import { AppConfigService } from 'src/app/services/appconfigservice';
import { BrandvehicleService } from 'src/app/services/brandvehicle.service';
import { EstimateService } from 'src/app/services/estimate.service';
import { PolicyService } from 'src/app/services/policy.service';
import { VehicleService } from 'src/app/services/vehicle.service';


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  listcus: Account[]
  countcus: number
  listbrand: CountVehicle[]
  listestimate: CountEstimate[]
  countEs: number
  countPolicies: number
  getbrand: any
  getmonth: any
  getcount: any
  getsum: any
  countvehicle: any
  brand: string
  data: any;
  basicData: any;
  chartOptions: any;
  subscription: Subscription;

  config: AppConfig;
  constructor(
    private accountService: AccountService,
    private estimateService: EstimateService,
    private polyciesService: PolicyService,
    private vehicleService: VehicleService,
    private configService: AppConfigService
  ) { }
  ngOnInit(): void {
    this.accountService.findAllCustomer().then(
      res =>{
        this.listcus = res as Account[]
        this.countcus = this.listcus.length
      },err =>{
        console.log(err)
      }
    )

    this.estimateService.findAllEstimate().then(
      res =>{
        var estimate: Estimate[] = res as Estimate[]
        this.countEs = estimate.length
      },err =>{
        console.log(err)
      }  
    )

    this.polyciesService.findAllPolicy().then(
      res =>{
        var polycies: PolicyService[] = res as PolicyService[]
        this.countPolicies = polycies.length
      },err =>{
        console.log(err)
      }  
    )

    this.vehicleService.countVehicle().then(
        res =>{
          this.listbrand = res as CountVehicle[]
          console.log(this.listbrand)
          this.getbrand = this.listbrand.map((obj) => obj.brandname.charAt(0).toUpperCase() + obj.brandname.slice(1));
          this.countvehicle = this.listbrand.map((obj) => obj.count);
             console.log(this.getbrand)
            console.log(this.countvehicle)
          this.data = {
          labels: this.getbrand,
           datasets: [
            {
                data: this.countvehicle,
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ]
            }
        ]
    };
        },err =>{
          console.log(err)
        }
      )

      this.estimateService.countEstimate().then(
        res => {
          this.listestimate = res as CountEstimate[]
          this.getmonth = this.listestimate.map((obj) => obj.month);
          this.getcount = this.listestimate.map((obj) => obj.count);
          this.getsum = this.listestimate.map((obj) => obj.sum);
          console.log("month: " + this.getmonth)
          console.log("count: " + this.getcount)
          console.log("sum: " + this.getsum)
          this.basicData = {
            labels: this.getmonth,
            datasets: [
                {
                    label: 'Number contract',
                    data: this.getcount,
                    fill: false,
                    borderColor: '#42A5F5',
                    tension: .4
                },
                {
                    label: 'Revenue',
                    data: this.getsum,
                    fill: false,
                    borderColor: '#FFA726',
                    tension: .4
                }
            ]
        };
        }, err => {
          console.log(err)
        }
      )

      this.config = this.configService.config;
      this.updateChartOptions();
      this.subscription = this.configService.configUpdate$.subscribe(config => {
          this.config = config;
          this.updateChartOptions();
      });


  }
  updateChartOptions() {
    this.chartOptions = this.config && this.config.dark ? this.getDarkTheme() : this.getLightTheme();
}

getLightTheme() {
    return {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    }
}

getDarkTheme() {
    return {
        plugins: {
            legend: {
                labels: {
                    color: '#ebedef'
                }
            }
        }
    }
}
}
 