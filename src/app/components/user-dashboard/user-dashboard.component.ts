import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  currentAssignment = ''
  userCourse = 'Javascript';
  username = 'Martin Smolka';
  tutor = {
    name: 'Martin',
    picture: '../../../assets/pictures/martin.jpg',
    tutorUid: 'saldkfjas39i421093'
  }

  infoTiles = [
    {
      description: 'Completed modules:',
      info: '14'
    },
    {
      description: 'Newest Skill:',
      info: 'Arrays'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
