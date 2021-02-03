import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { fadeAnimation } from './../../animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [fadeAnimation] // register the animation
})
export class MainComponent implements OnInit {

  constructor(private _router: Router) {}

  ngOnInit() {
  }

}
