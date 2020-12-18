import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HeroComponent } from './hero/hero.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ArticleComponent } from './article/article.component';
import { AboutComponent } from './about/about.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { P404Component } from './p404/p404.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ContactComponent } from './contact/contact.component';
import { PieComponent } from './pie/pie.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { SignupComponent } from './signup/signup.component';
import { AddbudgetComponent } from './addbudget/addbudget.component';
import {AuthguardGuard} from './authguard.guard';
import { DataService } from './data.service';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './table/table.component';
import { BarComponent } from './bar/bar.component';
import { ChartsModule } from 'ng2-charts';
import { MaxbudgetpieComponent } from './maxbudgetpie/maxbudgetpie.component';
import { LinechartComponent } from './linechart/linechart.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; 



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeroComponent,
    FooterComponent,
    HomepageComponent,
    ArticleComponent,
    AboutComponent,
    LoginPageComponent,
    P404Component,
    BreadcrumbsComponent,
    ContactComponent,
    PieComponent,
    BarChartComponent,
    SignupComponent,
    AddbudgetComponent,
    TableComponent,
    BarComponent,
    MaxbudgetpieComponent,
    LinechartComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ChartsModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-left',
      preventDuplicates: true 
    }),
    NgIdleKeepaliveModule.forRoot(),

  ],
  providers: [DataService, AuthguardGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
