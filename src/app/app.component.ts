import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import localeBn from '@angular/common/locales/bn';
import {NavigationEnd, Router} from '@angular/router';
import {isPlatformBrowser, registerLocaleData} from '@angular/common';
import {Meta, Title} from '@angular/platform-browser';

// declare gives Angular app access to ga function
declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public router: Router,
    private title: Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) public platformId: any
  ) {


  }

  ngOnInit(): void {
  }




}
