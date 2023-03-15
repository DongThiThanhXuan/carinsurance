import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FooterAdminComponent } from './footeradmin/footeradmin.component';

import { AdminSideBarComponent } from './adminsidebar/adminsidebar.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import {PanelMenuModule} from 'primeng/panelmenu';
import { DropdownModule } from 'primeng/dropdown';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SlideMenuModule } from 'primeng/slidemenu';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { MessageService } from 'primeng/api';
import { AccountService } from '../services/account.service';
import { AccountComponent } from './component/account/account.component';
import { BaseURLService } from '../services/baseurl.service';
import {DialogModule} from 'primeng/dialog';
import {TooltipModule} from 'primeng/tooltip';
import { Validation } from '../services/validation.service';
import { VehicleComponent } from './component/vehicle/vehicle.component';
import { VehicleService } from '../services/vehicle.service';
import {InputNumberModule} from 'primeng/inputnumber';
import { BrandvehicleService } from '../services/brandvehicle.service';
import { ProfileComponent } from './component/profile/profile.component';
import { ChangePassComponent } from './component/changepass/changepass.component';
import { BrandComponent } from './component/brand/brand.component';
import {ChartModule} from 'primeng/chart';
import { AppConfigService } from '../services/appconfigservice';
import { EstimateService } from '../services/estimate.service';
import { PolicyService } from '../services/policy.service';
import { ContractComponent } from './component/contract/contract.component';
import {DividerModule} from 'primeng/divider';
//xuan
import {ToolbarModule} from 'primeng/toolbar';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {RadioButtonModule} from 'primeng/radiobutton';
import { PolicyAdminComponent } from './component/policy/policy.component';
import { EstimateComponent } from './component/estimate/estimate.component';
import { ReLoadPageComponent } from './component/reloadoage/reloadoage.component';


@NgModule({
  declarations: [
   AdminComponent,
   FooterAdminComponent,
   AdminSideBarComponent,
   DashboardComponent,
   AccountComponent,
   VehicleComponent,
   PolicyAdminComponent,
   ContractComponent,
   BrandComponent,
   ProfileComponent,
   ChangePassComponent,
   EstimateComponent,
   ReLoadPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AdminRoutingModule,
    PanelMenuModule,
    DropdownModule,
    NoopAnimationsModule,
    SlideMenuModule,
    ToastModule,
    ConfirmDialogModule,
    ButtonModule,
    TableModule,
    DialogModule,
    TooltipModule,
    InputNumberModule,
    ChartModule,
    DividerModule,
    ToolbarModule,
    DynamicDialogModule,
    ToggleButtonModule,
    RadioButtonModule
  ],
  providers: [
    AccountService,
    VehicleService,
    BrandvehicleService,
    ConfirmationService,
    MessageService,
    BaseURLService,
    Validation,
    AppConfigService,
    EstimateService,
    PolicyService
  ],
  bootstrap: []
})
export class AdminModule { }
