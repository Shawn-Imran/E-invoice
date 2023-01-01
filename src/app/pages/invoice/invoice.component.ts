import { Component, OnInit } from '@angular/core';
import * as crypto from 'crypto-js';
// import * as crypto from 'crypto';
// import XMLWriter from 'xml-writer';
import JSEncrypt from 'jsencrypt';
import { saveAs } from 'file-saver';
import pdfMake from "pdfmake/build/pdfmake";

// import { Invoice } from '@axenda/zatca';
import {Buffer} from 'buffer';
import pdfFonts from "pdfmake/build/vfs_fonts";
import { log } from 'console';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const encrypt = new JSEncrypt();
encrypt.getKey();

class Product{
  name: string;
  price: number;
  qty: number;
  vat: number;
  subtotal: number;
}
class InvoiceM{
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
  decryptedData: string = '';
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

  invoice = new InvoiceM();

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


    // const qritem = "Seller name: " + this.invoice.sellerName + "\n" + "VAT Reg. No.: " + 
    // this.invoice.vatRegNumber + "\n" + "time stamp: " + new Date().toLocaleString() + "\n" + "Total Amount: " + 
    // this.invoice.products.reduce((sum, p)=> sum + (p.qty * p.price), 0).toFixed(2) + "\n" + "Vat: " + 
    // this.invoice.products.reduce((sum, p)=> sum + (p.qty * p.price * p.vat / 100), 0).toFixed(2) + "\n" + "Hash: " + "123456789" + "\n" + "Cryptographic Stam: " + "123456789" + "\n" + "Public Key: " + "123456789" + "\n" + "Private: " + "123456789" + "\n" + "Zatca Cryptographic Stamp: " + "123456789";
    // console.log(qritem);

    // const pinvoice = {
    //   sellerName: 'ورشة عيسى معتوق السعيد للألمنيوم',
    //   vatRegistrationNumber: 'Tax-0123456789',
    //   invoiceTimestamp: '2017-03-01T10:16:42Z',
    //   invoiceTotal: 511,
    //   invoiceVatTotal: 10,
    // };
    const totalVat= this.invoice.products.reduce((sum, p)=> sum + (p.qty * p.price * p.vat / 100), 0).toFixed(2);
    const totalWithVat=  this.invoice.products.reduce((sum, p)=> sum + (p.qty * p.price + p.qty * p.price * p.vat / 100), 0).toFixed(2);

    const _Seller = this.hex(1, this.invoice.sellerName);
    const _TaxNo = this.hex(2, "TAX-"+this.invoice.vatRegNumber);
    const _dateTime = this.hex(3, new Date().toLocaleString());
    const _Total = this.hex(4, totalWithVat);
    const _Tax = this.hex(5, totalVat);
    var b64 = this.hexToBase64(_Seller + _TaxNo + _dateTime + _Total + _Tax);
    console.log("b64:   ",b64);
    this.qrInfo = b64;
}


hex(tag, val){
  let utf8Encode = new TextEncoder();
	var x = utf8Encode.encode(val)
		if (x.length > 9 && x.length < 16) {
			var len = '0' + x.length.toString(16);
		} else if (x.length > 15) {
			var len = x.length.toString(16);
		} else {
			var len = this.toHexString(x.length.toString());
		}
		var HexTag = this.toHexString(tag.toString());
	var HexValue = this.toHexString(x);
	var fval = (HexTag + len + HexValue).toUpperCase();
	// console.log(fval);
	return fval;
}


toHexString(byteArray) {
	return Array.from(byteArray, function (byte: any) {
		return ('0' + (byte & 0xFF).toString(16)).slice(-2);
	}).join('')
}

hexToBase64(hexstring) {
	console.log(hexstring);
	return btoa(hexstring.match(/\w{2}/g).map(function (a) {
			return String.fromCharCode(parseInt(a, 16));
		}).join(""));
}









  xml_data = '';

  
  
  getxml(){
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <Invoice>
    <SellerName>${this.invoice.sellerName}</SellerName>
    <VatRegNumber>${this.invoice.vatRegNumber}</VatRegNumber>
    <TimeStamp>${new Date().toLocaleString()}</TimeStamp>
    <TotalAmount>${this.invoice.products.reduce((sum, p)=> sum + (p.qty * p.price), 0).toFixed(2)}</TotalAmount>
    <Vat>${this.invoice.products.reduce((sum, p)=> sum + (p.qty * p.price * p.vat / 100), 0).toFixed(2)}</Vat>
    </Invoice>`;
    this.xml_data = xml;


    const datetimeStamp = new Date().toLocaleString();
    console.log(datetimeStamp);
    
    const invoiceName = 'invoice' + datetimeStamp + '.xml';
    const blob = new Blob([this.xml_data], {type: 'text/xml'});
    saveAs(blob, invoiceName);
  }



  downloadXml(){
    const datetimeStamp = new Date().toLocaleString();
    console.log(datetimeStamp);

    const invoiceName = 'invoice' + datetimeStamp + '.xml';
    const blob = new Blob([this.xml_data], {type: 'text/xml'});
    saveAs(blob, invoiceName);
  }


  generateHash(){
    // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    //   modulusLength: 4096,
    //   publicKeyEncoding: {
    //     type: 'spki',
    //     format: 'pem'
    //   },
    //   privateKeyEncoding: {
    //     type: 'pkcs8',
    //     format: 'pem'
    //   }
    // });
   //generate public and private key
   

  

    let privatek = encrypt.getPrivateKey();
    let publick = encrypt.getPublicKey();

const publicKeyarray = privatek.split('-----');
// console.log("Publicarray:-",publicKeyarray);
const privateKeyarray = privatek.split('-----');
// console.log("Privatearray:-",privateKeyarray);

this.publicKey = publicKeyarray[2];
this.privateKey = privateKeyarray[2];
console.log(this.privateKey);
console.log(this.publicKey);



    let xml = `<?xml version="1.0" encoding="UTF-8"?>
    <Invoice>
    <SellerName>${this.invoice.sellerName}</SellerName>
    <VatRegNumber>${this.invoice.vatRegNumber}</VatRegNumber>
    <TimeStamp>${new Date().toLocaleString()}</TimeStamp>
    <TotalAmount>${this.invoice.products.reduce((sum, p)=> sum + (p.qty * p.price), 0).toFixed(2)}</TotalAmount>
    <Vat>${this.invoice.products.reduce((sum, p)=> sum + (p.qty * p.price * p.vat / 100), 0).toFixed(2)}</Vat>
    </Invoice>`;

    // const hash = crypto.publicEncrypt({
    //   key: publicKey,
    //   padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    //   oaepHash: this.hashdigest
    // }, Buffer.from(xml)).toString("base64");


    // const hash = encrypt.sign(xml, privateKey, 'sha256');
    const prehash = crypto.AES.encrypt(xml, this.publicKey);
    console.log("Prehash:-",prehash);
    
    this.hash = prehash.toString();
    console.log("Hash:-",this.hash);

    const decrypted = crypto.AES.decrypt(prehash, this.privateKey);

 
    // const decrypt = JSON.parse(decrypted.toString(crypto.enc.Utf8));
    // const decrypted = crypto.privateDecrypt({
    //   key: privateKey,
    //   padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    //   oaepHash: this.hashdigest
    // }, Buffer.from(hash));

    // const decrypted = encrypt.verify(xml, publicKey, hash, 'sha256');
    this.decryptedData = decrypted.toString(crypto.enc.Utf8);
    console.log("XML:-",this.decryptedData);
  }


}















  // getxml(){
  //   const xml = new XMLWriter();
  //   xml.startDocument();
  //   xml.startElement('Invoice');
  //   xml.writeElement('SellerName', this.invoice.sellerName);
  //   xml.writeElement('VatRegNumber', this.invoice.vatRegNumber);
  //   xml.writeElement('TimeStamp', new Date().toLocaleString());
  //   xml.writeElement('TotalAmount', this.invoice.products.reduce((sum, p)=> sum + (p.qty * p.price), 0).toFixed(2));
  //   xml.writeElement('Vat', this.invoice.products.reduce((sum, p)=> sum + (p.qty * p.price * p.vat / 100), 0).toFixed(2));
  //   xml.writeElement('Hash', "123456789");
  //   xml.writeElement('CryptographicStamp', "123456789");
  //   xml.writeElement('PublicKey', "123456789");
  //   xml.writeElement('PrivateKey', "123456789");
  //   xml.writeElement('ZatcaCryptographicStamp', "123456789");
  //   xml.endElement();
  //   xml.endDocument();
  //   this.xml_data = xml.toString();