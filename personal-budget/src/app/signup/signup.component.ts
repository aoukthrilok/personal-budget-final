import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../notification.service';



@Component({
  selector: 'pb-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  username:string;
  password:string;
  repassword:string;
  email:string

  public userData = [];

  
  constructor(private http:HttpClient,private router:Router,public _dataService: DataService, private toastr: ToastrService,private notifyService : NotificationService) { }
  
 

  ngOnInit(): void {
  }
  
 


  duplicateUserName(){
    alert('User name already exists')
    
  }

  incompleteDetails(){
    alert('Please enter all the fields')
   
  }
 

  loginFunction(){
    let record = {};
    record['username'] = this.username;
    record['password'] = this.password;    
    record['email'] = this.email;
    record['repassword'] = this.repassword;
    console.log(this.userData);
    for(let i=0;i<this.userData.length;i++){
      if(this.userData[i].username == this.username){
        console.log("There exists a user with same username");
        alert('User with this name already exists.')
        
        this.password = "";
        this.repassword="";
        this.username="";
        this.email="";
        return;
      }
    }

    this.registrationProcess();
  }
  registrationProcess(){
    let record = {};
    record['username'] = this.username;
    record['password'] = this.password;    
    record['email'] = this.email;
    record['repassword'] = this.repassword;
    console.log(JSON.stringify(record));
    console.log(this.userData);

    if(this.password !=this.repassword){
      alert("Password does not match,Enter Password Again")
      this.password = "";
      this.repassword="";
      return;
    }
      if(!this.username || !this.password || !this.email || !this.repassword){
        alert('Please enter all the fields')
       
        return;
      }else{
        console.log("In else")
      this._dataService.userSignUp(record)
        .subscribe(res =>{
          this.username = "";
          this.password = "";
          this.email = "";
          this.router.navigate(['/login']);
        },
        err =>{
          console.log("Validation failed");
          
        })
    }    
  }
}
