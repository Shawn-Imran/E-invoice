import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angular2-qrcode';
// import { Invoice } from '@axenda/zatca';

@NgModule({
  declarations: [
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    FormsModule,
    QRCodeModule,
    // Invoice
  ]
})
export class InvoiceModule { }
