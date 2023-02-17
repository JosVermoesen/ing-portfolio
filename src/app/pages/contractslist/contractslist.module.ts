import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { ContractsListPage } from './contractslist.page';
import { ContractNewComponent } from './contractnew/contractnew.component';
import { ContractEditComponent } from './contractedit/contractedit.component';
import { ContractdetailComponent } from './contractdetail/contractdetail.component';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: ContractsListPage,
  },
];

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ContractNewComponent,
    ContractEditComponent,
    ContractdetailComponent,
    ContractsListPage,
  ],
  entryComponents: [
    ContractNewComponent,
    ContractEditComponent,
    ContractdetailComponent,
  ],
})
export class ContractsListPageModule {}
