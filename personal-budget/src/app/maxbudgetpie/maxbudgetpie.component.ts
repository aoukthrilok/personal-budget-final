import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { DataService } from '../data.service';
import { Chart } from 'chart.js'

@Component({
  selector: 'pb-maxbudgetpie',
  templateUrl: './maxbudgetpie.component.html',
  styleUrls: ['./maxbudgetpie.component.scss']
})
export class MaxbudgetpieComponent implements OnInit {

  public dataSource = {
    datasets: [{
        data: [],
        backgroundColor : [           
        ]
    }],

    labels: [
        
    ]
  }
  public loggedInUserName:any;


  constructor(private _dataService : DataService) { }

  ngOnInit(): void {
    this.loggedInUserName = this._dataService.loggedInUserName;
    this._dataService.getData(this.loggedInUserName)
  .subscribe((res: any) => {
    console.log(res);
    for (let i = 0; i < res.length; i++) {
     this.dataSource.datasets[0].data[i] = res[i].maxbudget;
     this.dataSource.labels[i] = res[i].title;
     this.dataSource.datasets[0].backgroundColor[i] = res[i].color;
     this.createChart();
    }
  });
  }

  createChart(){
    var ctx : any = document.getElementById("maxbudgetpie")
    var myPieChart = new Chart(ctx,{
        type: 'pie',
        data : this.dataSource
    })
}

}