import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.scss']
})
export class LinechartComponent implements OnInit {

  public dataSource = {
    datasets: [{
      label: 'Original Budget',
      data: [],
      fill:false,
     lineTension:0.2,
     borderColor:"red",
     borderWidth: 1
    }],

    labels: [
        
    ]
};
public loggedInUserName :any;


constructor(private _dataService : DataService) { 
  this.loggedInUserName = this._dataService.loggedInUserName;
}

ngOnInit(): void {
      
  this._dataService.getData(this.loggedInUserName)
  .subscribe((res:any)=>{
    for (let i = 0; i < res.length; i++) {
       this.dataSource.datasets[0].data[i] = res[i].budget;
       this.dataSource.labels[i] = res[i].title;
            
    }
  })
}

  createChart(){
    var ctx : any = document.getElementById("lineChart")
    var myPieChart = new Chart(ctx,{
        type: 'line',
        data : this.dataSource
    })
}


}