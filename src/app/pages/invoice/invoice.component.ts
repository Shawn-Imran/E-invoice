import { Component, OnInit } from '@angular/core';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class Product{
  name: string;
  price: number;
  qty: number;
  vat: number;
  subtotal: number;
}
class Invoice{
  sellerName: string;
  vatRegNumber: string;
  customerName: string;
  invoiceType: string;
  paymentReference: string;
  dn: string;
  po: string;
  gr: string;
  paymentMood: string;
  receipt: string;
  invoiceDate: Date;
  supplyDate: Date;
  dueDate: Date;

  products: Product[] = [];
  constructor(){
    // Initially one empty product row we will show
    this.products.push(new Product());
  }
}


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {


  hash: string = '';
  hashdigest = 'sha256';
  cryptoStampSignature: string = '';
  publicKey: string = '';
  privateKey: string = '';



  total: number
  constructor() { }

  ngOnInit() {
    // this.gettotal();
    // console.log("total",this.total);

  }


gettotal(){
  this.total=0;
  for (const key of this.invoice.products) {
    this.total += key.price * key.qty + key.price * key.qty * key.vat / 100;
    //number to string
    this.total = Number(this.total.toFixed(2));

  }
  console.log(this.total);
}


  invoice = new Invoice();

  generatePDF(action = 'open') {
    let docDefinition = {
      content: [
        {
          text: 'Smart Shop',
          fontSize: 16,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'INVOICE',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'skyblue'
        },
        {
          text: 'Customer Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: this.invoice.customerName,
                bold:true
              },
              { text: this.invoice.invoiceType }
            ],
            [
              {
                text: `Address: los angeles`,
                alignment: 'right'
              },
              {
                text: `Email: smartshop@gmail.com`,
                alignment: 'right'
              },
              {
                text: `Phone: 12345678901`,
                alignment: 'right'
              },
              {
                text: ` `,
                alignment: 'right'
              },
              {
                text: `Date: ${new Date().toLocaleString()}`,
                alignment: 'right'
              },
              {
                text: `Bill No : ${((Math.random() *1000).toFixed(0))}`,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'Order Details',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Product', 'Price', 'Quantity', 'Amount'],
              ...this.invoice.products.map(p => ([p.name, p.price, p.qty, (p.price*p.qty).toFixed(2)])),
              [{text: 'Total Amount', colSpan: 3}, {}, {}, this.invoice.products.reduce((sum, p)=> sum + (p.qty * p.price), 0).toFixed(2)]
            ]
          }
        },
        {
          text: 'Additional Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [{ qr: `Smart Shop
${this.invoice.customerName}
${this.invoice.products.map(p => ([p.name]))}
${this.invoice.products.reduce((sum, p)=> sum + (p.qty * p.price), 0).toFixed(2)}`, fit: '100' }],
            [{ text: 'Md. Al Mahmud Imran', alignment: 'right', italics: true},
              { text: 'Authorized Signature', alignment: 'right', italics: true}
            ],
          ]
        },
        {
          text: 'Terms and Conditions',
          style: 'sectionHeader'
        },
        {
            ul: [
              'Order can be return in max 10 days.',
              'Warrenty of the product will be subject to the manufacturer terms and conditions.',
              'This is system generated invoice.',
            ],
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]
        }
      }
    };

    if(action==='download'){
      pdfMake.createPdf(docDefinition).download();
    }else if(action === 'print'){
      pdfMake.createPdf(docDefinition).print();
    }else{
      pdfMake.createPdf(docDefinition).open();
    }

  }

  addProduct(){
    this.invoice.products.push(new Product());
  }





  item = '';
  qrInfo = JSON.stringify(this.item);

  getqr(){


    const qritem = "Seller name: " + this.invoice.sellerName + "\n" + "VAT Reg. No.: " + this.invoice.vatRegNumber + "\n" + "time stamp: " + new Date().toLocaleString() + "\n" + "Total Amount: " + this.invoice.products.reduce((sum, p)=> sum + (p.qty * p.price), 0).toFixed(2) + "\n" + "Vat: " + this.invoice.products.reduce((sum, p)=> sum + (p.qty * p.price * p.vat / 100), 0).toFixed(2) + "\n" + "Hash: " + "123456789" + "\n" + "Cryptographic Stam: " + "123456789" + "\n" + "Public Key: " + "123456789" + "\n" + "Private: " + "123456789" + "\n" + "Zatca Cryptographic Stamp: " + "123456789";
    this.qrInfo = qritem;
    console.log(this.qrInfo);
  }
}
