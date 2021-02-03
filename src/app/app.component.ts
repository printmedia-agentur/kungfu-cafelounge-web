import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { HotjarService } from 'ng-hotjar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'KungFu Cafelounge';

  constructor(private _router: Router, private authService: AuthService, hotjarService: HotjarService) {}

  ngOnInit() {}
}
