import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { MatMenuTrigger, MatMenu } from '@angular/material/menu';
import { Router } from '@angular/router';



@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagesComponent implements OnInit {



  constructor() {}

  ngOnInit(): void {
  }

}
