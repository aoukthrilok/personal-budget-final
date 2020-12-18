import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js'
import * as D3 from 'd3';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public dataSource = {
    datasets: [{
        data: [],
        backgroundColor : [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
          '#808000',
          '#E74C3C ',
          '#A569BD ',
          '#33FFE0'
            ]
    }],

    labels: [

    ]
};
public loggedInUserName:any;

constructor(private _dataService : DataService,private router:Router) { }

ngOnInit(): void {

this.loggedInUserName = this._dataService.loggedInUserName;
this._dataService.getData(this.loggedInUserName)
.subscribe((res: any) => {
  console.log(res);
  for (let i = 0; i < res.length; i++) {
   this.dataSource.datasets[0].data[i] = res[i].budget;
   this.dataSource.labels[i] = res[i].title;
   this.dataSource.datasets[0].backgroundColor[i] = res[i].color;
   this.createChart();
  }
});


}

createChart(){
  var ctx : any = document.getElementById("myChart")
  var myPieChart = new Chart(ctx,{
      type: 'pie',
      data : this.dataSource
  })
}

AddBudget(){
  this.router.navigate(['/addbudget']);
}

callNgOnInit(){
  this.ngOnInit();
}

}
