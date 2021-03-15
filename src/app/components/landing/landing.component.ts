import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  promotion = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  togglePromotion() {
    this.promotion = false;
  }

  login() {
    this.router.navigate(['login'])
  }

  register() {

  }

  home() {

  }
}
