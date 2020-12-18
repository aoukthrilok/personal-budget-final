import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';


interface BudgetSchema{
  id: string;
  budget: number;
  maxbudget: number;
  color: string;
}

@Component({
  selector: 'pb-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  budgetData: Observable<BudgetSchema[]>;

  data = []

  public loggedInUserName:any
  constructor(private _dataService: DataService) {
    this.loggedInUserName = this._dataService.loggedInUserName;
   }

  ngOnInit(): void {    
    this._dataService.getData(this.loggedInUserName)
    .subscribe((res:any)=>{
      this.data = res
      console.log(this.data);
    })
  

}

}