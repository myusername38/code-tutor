import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Student } from '../../interfaces/student';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tutor-dashboard',
  templateUrl: './tutor-dashboard.component.html',
  styleUrls: ['./tutor-dashboard.component.scss']
})
export class TutorDashboardComponent implements OnInit {

  username = 'Martin Smolka'

  tutorStudents: Student[] = [
    {
      student: 'Martin Smolka',
      course: 'Javascript',
      nextMeeting: 1615511083582,
      status: 'Working'
    },
    {
      student: 'Chuck Norris',
      course: 'Javascript',
      nextMeeting: 1615510083582,
      status: 'Stuck'
    },
    {
      student: 'Ronald Reagan',
      course: 'Scratch',
      nextMeeting: 1615521083582,
      status: 'Not-Started'
    },
    {
      student: 'Bill Gates',
      course: 'Javascript',
      nextMeeting: 1615511023582,
      status: 'Needs Help'
    }
  ];

  notifications: { id: string, notifcation: string }[] = [];

  studentData = new MatTableDataSource<Student>();
  loading = false;
  displayedColumns: string[] = ['student', 'course', 'nextMeeting', 'status', 'expand'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() { }

  ngOnInit(): void {
    this.studentData.data = this.tutorStudents;
  }

}
