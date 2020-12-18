import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { UserSchema } from './models/users';
import { Router } from '@angular/router';
import { BudgetSchema } from '../app/models/budget';
import { local } from 'd3';
import { ToastrModule, ToastrService } from 'ngx-toastr';


import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

export interface Item {
  name: string;
  value: number;
  abs: number;
}

@Injectable({
  providedIn: 'root'
})


export class DataService {

DataObservable: Observable<any>;
userData : Observable<UserSchema[]>
budgetData: Observable<BudgetSchema[]>;


isUserLoggedIn = new Subject<boolean>();
timerId: any;
isOpenModel = new Subject<boolean>();
userRecord = {};
logouthandler = true;
loggedInUserName : any;


constructor(private http: HttpClient,public router: Router,private toastr:ToastrService,private idle: Idle, private keepalive: Keepalive) { 
  this.isOpenModel.next(false);
}

getData(username): Observable<any> {
  const token = localStorage.getItem('accessToken');  
  console.log(token);
  const headers = {'content-type': 'application/json','Authorization' : `Bearer ${token}`};
    this.DataObservable = this.http.get('http://localhost:3000/budget',{ headers: headers,params:{userid : username }}).pipe(shareReplay());
    return this.DataObservable;  
}

addBudgetdata(data:BudgetSchema){
  const token = localStorage.getItem('accessToken');
  const headers = {'content-type': 'application/json','Authorization' : `Bearer ${token}`};
  const body=JSON.stringify(data);
  console.log(body)
  return this.http.post('http://localhost:3000/budget',body,{'headers':headers});
}

private readonly NAMES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

  private readonly MIN_ITEM = 10;
  private readonly MAX_ITEM = 20;

  private readonly MAX_VALUE = 100;

  private generateRandomValue(start: number, end: number) {
    return Math.ceil(Math.random() * (end - start) + start);
  }

  getData1(): Item[] {
    
    const nbItems = this.generateRandomValue(this.MIN_ITEM, this.MAX_ITEM);
    console.log(nbItems);
    const samples = [];
    for (let i = 0; i < nbItems; i++) {
      const val = this.generateRandomValue(1, this.MAX_VALUE);
      samples.push({
        name: this.NAMES[i],
        value: val,
        abs: Math.abs(val)
      });
    }
    return samples;
  }
  userSignUp(data:UserSchema){
    console.log(this.getData(data["username"]))
    const headers = {'content-type': 'application/json'};
    const body=JSON.stringify(data);
    return this.http.post('http://localhost:3000/users',body,{'headers':headers});
  }

  invaliduser(){
  //  this.toastr.error("User does not exist. Please proceed to signup page",'Error');
   alert("Username or password is incorrect. Please proceed to signup page")
  }

  loginSuccessful(){
    this.toastr.success('Logged In','Success');
    // alert()
  }

  userLogin(data:UserSchema){
    const headers = {'content-type': 'application/json'};
    const body=JSON.stringify(data);
    console.log(body)
    return this.http.post('http://localhost:3000/auth',body,{'headers':headers}).subscribe((res:any)=>{
      console.log("Response after login: "+res);       
      this.userRecord['username'] = data.username;
      this.userRecord['password'] = data.password;
      console.log("user record is "+JSON.stringify(this.userRecord));
      this.loggedInUserName = data.username;
      localStorage.setItem('accessToken',res.token);
          localStorage.setItem('refreshToken',res.refreshToken);      
          localStorage.setItem('exp',res.exp);                 
          this.isUserLoggedIn.next(true); 
          this.router.navigate(['/homepage']);            
          this.setTimer(true);
          // this.inactivityTime();
        },err=>{
            this.invaliduser();
            console.log('errorrrr')
        })
    }    


  //   public inactivityTime () {
  //     var time;
  //     window.onload = resetTimer;
  //     // DOM Events
  //     document.onmousemove = resetTimer;
  //     document.onkeypress = resetTimer;
  
  //     function resetTimer() {
  //         clearTimeout(time);
  //         time = setInterval(this.setTimer(), 5000)
  //     }
  // };


 
    public setTimer(flag){
      console.log("Timer set");
      if (flag){
        this.timerId = setInterval(() => {
          const exp = localStorage.getItem('exp');
          const expdate = new Date(0).setUTCSeconds(Number(exp));
          console.log("Expiry Date: "+expdate + "----"+ expdate.valueOf())
          const TokenNotExpired = expdate.valueOf() > new Date().valueOf();
          const lessThanTwentySecRemaining = expdate.valueOf() - new Date().valueOf() <= 20000;
          console.log(lessThanTwentySecRemaining);
          if (this.loggedInUserName == ""){
            flag=false
            return
          }
          if (TokenNotExpired && lessThanTwentySecRemaining && this.logouthandler) {                                        
            let message = confirm(
              'Your session is going to expire in 20 seconds! click OK to extend the session!'
            );
            if(message && this.logouthandler){
              let record = {};
              record['username'] = this.userRecord['username']
              record['password'] = this.userRecord['password'];
              console.log(JSON.stringify(record));
              this.logouthandler = true;
              
              this.userLogin(record);
              return
            }else{
              console.log("Session will continue");
              message = false;
              this.logouthandler = false;
            }
          }                         
          if (new Date().valueOf() >= expdate.valueOf()){
            clearInterval(this.timerId);  
            flag=false         
            this.logout();
            return;
    }
        }, 20000);
      } else {
        clearInterval(this.timerId);
      }
    }

    public logout(): void {
      // this.setTimer(false)
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');  
      localStorage.removeItem('exp');  
      this.loggedInUserName = "";  
      this.userRecord['username']=""
      this.userRecord['username']=""
      this.isUserLoggedIn.next(false);
      this.router.navigate(['/login']);
    } 
    public getLoginStatus(): Observable<boolean> {
      return this.isUserLoggedIn;
    }    

    verifyTokenPresence(){
      return !!localStorage.getItem('token');
    }
    
}
