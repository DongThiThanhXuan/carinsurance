import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AutoCompleteModule} from 'primeng/autocomplete';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import { NgxPayPalModule } from 'ngx-paypal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/pages/about/about.component';
import { TeamComponent } from './components/pages/team/team.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { TestimonialsComponent } from './components/pages/testimonials/testimonials.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { LoginRegisterComponent } from './components/pages/login-register/login-register.component';
import { TermsConditionComponent } from './components/pages/terms-condition/terms-condition.component';
import { PrivacyPolicyComponent } from './components/pages/privacy-policy/privacy-policy.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { FooterStyleTwoComponent } from './components/footer/footer-style-two.component';
import { NavbarStyleTwoComponent } from './components/navbar/navbar-style-two.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AdminModule } from './admin/admin.module';
import {ButtonModule} from 'primeng/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { AccountService } from './services/account.service';
import { LoginService } from './services/login.service';


import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';

import { Validation } from './services/validation.service';
import {DividerModule} from 'primeng/divider';

// dat 
import { BuyInsuranceComponent } from './components/pages/buy-insurance/buy-insurance.component';
import { PreviewFormComponent } from './components/pages/buy-insurance/previewForm/preview-form.component';
import { DetailPolicyComponent } from './components/pages/buy-insurance/detailPolicy/detail-policy.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import {TabViewModule} from 'primeng/tabview';
import { LogoutComponent } from './components/logout/logout.component';
import { PolicyService } from './services/policy.service';
import { EstimateService } from './services/estimate.service';
import { DatePipe } from '@angular/common';
import { UpdateProfileComponent } from './components/pages/profile/updateProfile/update.component';
import { ChangePassWordComponent } from './components/pages/profile/changePassword/changepass.component';
import { PolicyComponent } from './components/pages/policy/policy.component';



export function tokenGetter() {
  return localStorage.getItem("jwt");
}
@NgModule({
  declarations: [
    AppComponent,
    PreloaderComponent,
    HomeComponent,
    NavbarStyleTwoComponent,
    FooterStyleTwoComponent,
    AboutComponent,
    TeamComponent,
    FaqComponent,
    TestimonialsComponent,
    ErrorComponent,
    LoginRegisterComponent,
    TermsConditionComponent,
    PrivacyPolicyComponent,
    CheckoutComponent,
    ContactComponent,
    //dat
    BuyInsuranceComponent,
    PreviewFormComponent,
    DetailPolicyComponent,
    ProfileComponent,
    UpdateProfileComponent,
    ChangePassWordComponent,
    //xuan
    LogoutComponent,
    PolicyComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AdminModule,
 //--xuan
 FormsModule,
 ReactiveFormsModule,
 HttpClientModule,
 JwtModule.forRoot({       // route guard
   config: {
     tokenGetter: tokenGetter,
     allowedDomains: ["localhost:4200"],
     disallowedRoutes: [],
   }
 }),
 DividerModule,
 
 //Dat
DialogModule,
ButtonModule,
TabViewModule,
ToastModule,
NgxPayPalModule,
TableModule,
AutoCompleteModule

  ],
  providers: [
    //---xuan
    JwtHelperService,
    AccountService,
    LoginService,
    Validation,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
//--dat
    PolicyService,
    EstimateService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
