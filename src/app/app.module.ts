import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './components/editor/editor.component';
import { LandingComponent } from './components/landing/landing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LearnMoreComponent } from './components/learn-more/learn-more.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './components/calendar/calendar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AssignmentBoardComponent } from './components/user-dashboard/assignment-board/assignment-board.component';
import { InfoTileComponent } from './components/user-dashboard/info-tile/info-tile.component';
import { TutorDashboardComponent } from './components/tutor-dashboard/tutor-dashboard.component';
import { PackagesComponent } from './components/packages/packages.component';
import { CourseTileComponent } from './components/course-tile/course-tile.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    LandingComponent,
    LearnMoreComponent,
    UserDashboardComponent,
    CalendarComponent,
    PasswordResetComponent,
    VerifyEmailComponent,
    LoginComponent,
    RegisterComponent,
    AssignmentBoardComponent,
    InfoTileComponent,
    TutorDashboardComponent,
    PackagesComponent,
    CourseTileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'code-tutor'),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatTableModule,
    MatIconModule,
    MatBadgeModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    NgbModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
