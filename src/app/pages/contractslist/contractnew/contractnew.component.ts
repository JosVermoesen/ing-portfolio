import { SelectOptions } from '../../../shared/models/selectOptions';
import { ManualContractService } from './../../../shared/services/manualcontract.service';
import { ToastService } from './../../../shared/services/toast.service';
import { VsoftContract } from '../../../shared/models/vsoftContract';
import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-contractnew',
  templateUrl: './contractnew.component.html',
  styleUrls: ['./contractnew.component.scss']
})
export class ContractNewComponent implements OnInit {
  @Input() lastId: number;

  form: UntypedFormGroup;
  vsoftContract: VsoftContract;

  VS97S: SelectOptions[]; // Actioncode
  A010S: SelectOptions[]; // Insurers
  A325S: SelectOptions[]; // Splitsingcode

  constructor(
    private toast: ToastService,
    private modalCtrl: ModalController,
    private translate: TranslateService,
    private mcService: ManualContractService
  ) {}

  ngOnInit() {
    this.refreshLanguage();
    this.createContractForm();
  }

  ionViewDidEnter() {
    const message =
      'Uw manueel ingebrachte contracten worden uitsluitend bewaard op dit toestel!';

    this.toast.show(message, 'long');
  }

  createContractForm() {
    this.form = new UntypedFormGroup({
      id: new UntypedFormControl('', {
        validators: [Validators.required, Validators.maxLength(12)]
      }),
      a010: new UntypedFormControl('', {
        validators: [Validators.required]
      }),
      vs99: new UntypedFormControl('', {
        validators: [Validators.required, Validators.min(1)]
      }),
      vs98: new UntypedFormControl(''),
      vs97: new UntypedFormControl('1', {
        validators: [Validators.required]
      }),
      aw2: new UntypedFormControl('', {
        validators: [Validators.required]
      }),
      a325: new UntypedFormControl('1', {
        validators: [Validators.required]
      })
    });
  }

  onCreate() {
    if (this.form.valid) {
      this.vsoftContract = Object.assign({}, this.form.value);
      this.mcService.addMC(this.vsoftContract);
      this.form.reset();
      this.modalCtrl.dismiss(this.vsoftContract, 'added');
    }
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  refreshLanguage() {
    this.translate
      .get('selectOptions.VS97')
      .subscribe((res: SelectOptions[]) => {
        this.VS97S = res;
      });

    this.translate
      .get('selectOptions.A010')
      .subscribe((res: SelectOptions[]) => {
        this.A010S = res;
      });

    this.translate
      .get('selectOptions.A325')
      .subscribe((res: SelectOptions[]) => {
        this.A325S = res;
      });
  }
}
