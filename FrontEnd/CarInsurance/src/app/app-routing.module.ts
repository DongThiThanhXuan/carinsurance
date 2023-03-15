import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/pages/about/about.component';
import { TeamComponent } from './components/pages/team/team.component';

import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { TestimonialsComponent } from './components/pages/testimonials/testimonials.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { LoginRegisterComponent } from './components/pages/login-register/login-register.component';
import { TermsConditionComponent } from './components/pages/terms-condition/terms-condition.component';
import { PrivacyPolicyComponent } from './components/pages/privacy-policy/privacy-policy.component';

import { ContactComponent } from './components/pages/contact/contact.component';
import { HomeComponent } from './components/pages/home/home.component';
import { BuyInsuranceComponent } from './components/pages/buy-insurance/buy-insurance.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PolicyComponent } from './components/pages/policy/policy.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'team', component: TeamComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: 'faq', component: FaqComponent},
    {path: 'testimonials', component: TestimonialsComponent},
    {path: 'error', component: ErrorComponent},
    {path: 'login-register', component: LoginRegisterComponent},
    {path: 'logout', component: LogoutComponent},
    
    {path: 'terms-condition', component: TermsConditionComponent},
    {path: 'privacy-policy', component: PrivacyPolicyComponent},
    {path: 'contact', component: ContactComponent},
    // Here add new pages component
    //dat
   {path: 'buy', component: BuyInsuranceComponent},
    {path: 'profile', component: ProfileComponent},
    //xuan
    {path: 'policy', component: PolicyComponent},
    
    
    //{path: '**', component: ErrorComponent} // This line will remain down from the whole pages component list
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}