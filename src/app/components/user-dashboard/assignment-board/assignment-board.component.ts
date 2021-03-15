import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignment-board',
  templateUrl: './assignment-board.component.html',
  styleUrls: ['./assignment-board.component.scss']
})
export class AssignmentBoardComponent implements OnInit {

  assignments = [
    {
      title: 'Hello World',
      status: 'complete',
      completed: '1615048113510'
    },
    {
      title: 'Program Math Equations',
      status: 'complete',
      completed: '1615048113610'
    },
    {
      title: 'Arrays!',
      status: 'complete',
      completed: '1615048113910'
    },
    {
      title: 'Functions',
      status: 'in-progress',
      completed: '-1'
    },
    {
      title: 'Functions',
      status: 'not-started',
      completed: '-1'
    }
  ]

  constructor() { }

  ngOnInit(): void {

  }

}
