import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/us-dashboard/calendar/calendar.component';
import { ChatComponent } from './components/us-dashboard/chat/chat.component';
import { MeetingComponent } from './components/us-dashboard/meeting/meeting.component';
import { RecordsComponent } from './components/us-dashboard/records/records.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { SigninComponent } from './components/authentication/signin/signin.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { AuthService } from './services/auth.service';
import { AdDashboardComponent } from './components/ad-dashboard/ad-dashboard.component';
import { AdsidnavComponent } from './components/ad-dashboard/adsidnav/adsidnav.component';
import { CoachsComponent } from './components/ad-dashboard/coachs/coachs.component';
import { AdcalendarComponent } from './components/ad-dashboard/adcalendar/adcalendar.component';
import { CommonModule } from '@angular/common';
import { UsDashboardComponent } from './components/us-dashboard/us-dashboard.component';
import { UsidenavComponent } from './components/us-dashboard/usidenav/usidenav.component';
import { BodyComponent } from './components/body/body.component';
import { GroupsComponent } from './components/ad-dashboard/groups/groups.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StudentsComponent } from './components/ad-dashboard/students/students.component';
@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    ChatComponent,
    MeetingComponent,
    RecordsComponent,
    AuthenticationComponent,
    SigninComponent,
    SignupComponent,
    AdDashboardComponent,
    AdsidnavComponent,
    CoachsComponent,
    AdcalendarComponent,
    UsDashboardComponent,
    UsidenavComponent,
    BodyComponent,
    GroupsComponent,
    StudentsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    HttpClientModule,
    CommonModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
