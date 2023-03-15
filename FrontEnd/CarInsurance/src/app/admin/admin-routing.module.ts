import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from '../components/pages/error/error.component';

import { RoleGuard } from '../_guards/role.guard';
import { AuthGuard } from '../_guards/auth.guard';
import { AdminComponent } from './admin.component';
import { AccountComponent } from './component/account/account.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { VehicleComponent } from './component/vehicle/vehicle.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ChangePassComponent } from './component/changepass/changepass.component';
import { BrandComponent } from './component/brand/brand.component';
import { ContractComponent } from './component/contract/contract.component';
import { PolicyAdminComponent } from './component/policy/policy.component';
import { EstimateComponent } from './component/estimate/estimate.component';
import { ReLoadPageComponent } from './component/reloadoage/reloadoage.component';

const routes: Routes = [
    {path: 'admin', 
        component: AdminComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {roles: ['admin']},
        children: [
            {path: '', component:DashboardComponent},
            {path: 'dashboard', component:DashboardComponent},
            {path: 'account', component:AccountComponent},
            {path: 'vehicle', component:VehicleComponent},
            {path: 'policy', component:PolicyAdminComponent},
            {path: 'contract', component:ContractComponent},
            {path: 'brand', component:BrandComponent},
            {path: 'profile', component:ProfileComponent},
            {path: 'changepass', component:ChangePassComponent},
            {path: 'estimate', component:EstimateComponent},
            {path: 'reloadpage', component:ReLoadPageComponent}
            
        ]
    },
    
    
    // Here add new pages component

   // {path: '**', component: ErrorComponent} // This line will remain down from the whole pages component list
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AdminRoutingModule {}