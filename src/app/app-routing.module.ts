import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './components/us-dashboard/calendar/calendar.component';
import { AdcalendarComponent } from './components/ad-dashboard/adcalendar/adcalendar.component';
import { MeetingComponent } from './components/us-dashboard/meeting/meeting.component';
import { ChatComponent } from './components/us-dashboard/chat/chat.component';
import { RecordsComponent } from './components/us-dashboard/records/records.component';
import { SigninComponent } from './components/authentication/signin/signin.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { AdDashboardComponent } from './components/ad-dashboard/ad-dashboard.component';
import { GroupsComponent } from './components/ad-dashboard/groups/groups.component';
import { StudentsComponent } from './components/ad-dashboard/students/students.component';
import { CoachsComponent } from './components/ad-dashboard/coachs/coachs.component';
import { UsDashboardComponent } from './components/us-dashboard/us-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: AdDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'calendar', component: AdcalendarComponent },
      { path: 'groups', component: GroupsComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'coachs', component: CoachsComponent },
    ],
  },
  {
    path: 'home',
    component: UsDashboardComponent,
    canActivate: [UserGuard],
    children: [
      { path: 'calendar', component: CalendarComponent },
      { path: 'meeting', component: MeetingComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'records', component: RecordsComponent },
    ],
  },
  { path: 'login', component: SigninComponent, canActivate: [LoginGuard] },
  { path: 'register', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
