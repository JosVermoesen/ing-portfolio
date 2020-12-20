import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './_guards/auth.guard';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { CustomerDetailResolver } from './_resolvers/customer-detail.resolver';
import { VsoftCustomerService } from './_services/vsoftcustomer.service';

// import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./pages/about/about.module').then((m) => m.AboutPageModule),
  },
  {
    path: 'qr',
    loadChildren: () =>
      import('./pages/qr/qr.module').then((m) => m.QrPageModule),
  },
  {
    path: 'insurers',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/insurers/insurers.module').then(
            (m) => m.InsurersPageModule
          ),
      },
      {
        path: ':insurerId',
        loadChildren: () =>
          import('./pages/insurers/insurer-detail/insurer-detail.module').then(
            (m) => m.InsurerDetailPageModule
          ),
      },
    ],
  },
  {
    path: 'device',
    loadChildren: () =>
      import('./pages/device-info/device-info.module').then(
        (m) => m.DeviceInfoPageModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/member/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/member/login/login.module').then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'member',
        loadChildren: () =>
          import('./pages/member/member.module').then(
            (m) => m.MemberPageModule
          ),
        resolve: { user: MemberEditResolver },
      },
      {
        path: 'customers/:id',
        loadChildren: () =>
          import('./pages/contractslist/contractslist.module').then(
            (m) => m.ContractsListPageModule
          ),
        resolve: { customer: CustomerDetailResolver },
      },      
      {
        path: 'map',
        loadChildren: () =>
          import('./pages/map/map.module').then((m) => m.MapPageModule),
      },
    ],
  },
  {
    path: 'customerslocalcopy',
    loadChildren: () =>
      import('./pages/contractslist/contractslist.module').then(
        (m) => m.ContractsListPageModule
      ),
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactPageModule)
  },

];

// routes, { useHash: true }
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    useHash: true,
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
}),
  ],
  providers: [MemberEditResolver, VsoftCustomerService, CustomerDetailResolver],
  exports: [RouterModule],
})
export class AppRoutingModule { }
