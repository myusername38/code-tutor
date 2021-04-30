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
  repeats = [1, 2, 3]
  courses = [
    {
      title: 'Scratch',
      difficulty: 'Begginer',
      ages: '7+',
      img: '../../../assets/icon_pictures/scratch_background.jpg',
      icon: '../../../assets/logos/scratch_logo.png',
    },
    {
      title: 'Javascript',
      difficulty: 'Intermediate',
      ages: '10+',
      img: '../../../assets/icon_pictures/javascript_code.jpg',
      icon: '../../../assets/logos/javascript_logo.png',
    },
    {
      title: 'Java',
      difficulty: 'Expert',
      ages: '12+',
      img: '../../../assets/icon_pictures/java_background.jpg',
      icon: '../../../assets/logos/java_logo.png',
    },
  ]


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
