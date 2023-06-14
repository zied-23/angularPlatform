import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Group } from 'src/app/models/group';
import { Session } from 'src/app/models/session.model';
import { Training } from 'src/app/models/training.model';
import { GroupService } from 'src/app/services/group.service';
import { SessionService } from 'src/app/services/session.service';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-adcalendar',
  templateUrl: './adcalendar.component.html',
  styleUrls: ['./adcalendar.component.scss'],
})
export class AdcalendarComponent implements OnInit {
  currentMonth!: string;
  daysInMonth!: number[];
  dayNames!: string[];
  daysOffset!: number[];
  currentDate!: Date;
  selectedDay!: number | null;
  currentYear!: number;
  selectedTraining: string = '';
  sessionTime: string = '';
  sessionDuration: number = 0;
  trainings: Training[] = [];
  groups: Group[] = [];
  selectedGroups: Group[] = [];
  session: Session = new Session();
  sessionGroups: Group[] = [];

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private groupService: GroupService,
    private snackBar: MatSnackBar,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.loadTrainings();
    this.loadGroups();
    this.currentDate = new Date();
    this.currentDate.setHours(this.currentDate.getHours() + 1); // Set to UTC+1
    this.updateMonth(this.currentDate);
    this.currentYear = new Date().getFullYear();
  }
  // Api Consuming
  loadTrainings() {
    this.trainingService.getAllTrainings().subscribe(
      (trainings) => {
        this.trainings = trainings;
      },
      (error) => {
        console.error('Failed to load trainings:', error);
      }
    );
  }

  loadGroups() {
    this.groupService.getAllGroups().subscribe(
      (groups) => {
        this.groups = groups;
      },
      (error) => {
        console.error('Failed to load groups:', error);
      }
    );
  }

  createSession() {
    if (this.selectedDay) {
      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() + 1); // Set to UTC+1

      // Convert sessionTime to a Date object
      const sessionTimeParts = this.sessionTime.split(':');
      const sessionHour = parseInt(sessionTimeParts[0], 10);
      const sessionMinute = parseInt(sessionTimeParts[1], 10);
      const selectedDate = new Date(
        this.currentYear,
        this.getMonthIndex(this.currentMonth),
        this.selectedDay,
        sessionHour,
        sessionMinute
      );

      if (selectedDate > currentDate) {
        const groupIdselected: string[] = this.selectedGroups.map(
          (group) => group.id
        );

        // Convert selectedDate and currentDate to UTC+1 timezone
        const selectedDateUTC = new Date(
          selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
        );
        const currentDateUTC = new Date(
          currentDate.getTime() - currentDate.getTimezoneOffset() * 60000
        );

        const session: Session = {
          startDate: selectedDateUTC,
          finishDate: new Date(
            selectedDateUTC.getTime() + this.sessionDuration * 60 * 60 * 1000
          ),
          groupIds: groupIdselected,
          trainingId: this.selectedTraining,
        };

        this.sessionService.createSession(session).subscribe(
          (response) => {
            console.log('Session created:', response);
            this.closeGroupsDialog();
          },
          (error) => {
            console.error('Failed to create session:', error);
          }
        );
      } else {
        console.error('Please select a future date and time for the session');
      }
    } else {
      console.error('No date selected');
    }
  }

  // End Api Consuming
  /* *************** */
  // Calendar Set-up
  goToPreviousMonth() {
    const currentMonth = this.getMonthIndex(this.currentMonth);
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousYear =
      previousMonth === 11
        ? this.currentDate.getFullYear() - 1
        : this.currentDate.getFullYear();

    const previousDate = new Date(previousYear, previousMonth);

    this.updateMonth(previousDate);
    if (previousMonth === 11 && currentMonth === 0) {
      this.currentYear--;
    }
  }

  goToNextMonth() {
    const currentMonth = this.getMonthIndex(this.currentMonth);
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear =
      nextMonth === 0
        ? this.currentDate.getFullYear() + 1
        : this.currentDate.getFullYear();

    const nextDate = new Date(nextYear, nextMonth);
    this.updateMonth(nextDate);
    if (nextMonth === 0 && currentMonth === 11) {
      this.currentYear++;
    }
  }

  selectDay(day: number) {
    this.selectedDay = day;
  }

  private updateMonth(date: Date) {
    this.currentMonth = this.getMonthName(date.getMonth());
    this.daysInMonth = this.getDaysInMonth(date.getFullYear(), date.getMonth());
    this.dayNames = this.getDayNames();
    this.daysOffset = this.getDaysOffset(date.getFullYear(), date.getMonth());
    this.selectedDay = null; // Reset selected day
  }

  private getMonthName(month: number): string {
    const monthNames = [
      'JANUARY',
      'FEBRUARY',
      'MARCH',
      'APRIL',
      'MAY',
      'JUNE',
      'JULY',
      'AUGUST',
      'SEPTEMBER',
      'OCTOBER',
      'NOVEMBER',
      'DECEMBER',
    ];
    return monthNames[month];
  }

  private getMonthIndex(monthName: string): number {
    const monthNames = [
      'JANUARY',
      'FEBRUARY',
      'MARCH',
      'APRIL',
      'MAY',
      'JUNE',
      'JULY',
      'AUGUST',
      'SEPTEMBER',
      'OCTOBER',
      'NOVEMBER',
      'DECEMBER',
    ];

    return monthNames.indexOf(monthName);
  }

  private getDaysInMonth(year: number, month: number): number[] {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array(daysInMonth)
      .fill(0)
      .map((_, index) => index + 1);
  }

  private getDayNames(): string[] {
    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return dayNames;
  }

  private getDaysOffset(year: number, month: number): number[] {
    const today = new Date();
    const firstDay = new Date(year, month, 1);
    const daysOffset = Array(firstDay.getDay()).fill(null);

    const pastDaysOffset = daysOffset.map((_, index) => {
      const day = index + 1;
      const date = new Date(year, month, day);
      return date < today ? -day : day;
    });

    return pastDaysOffset;
  }
  selectGroup(group: Group) {
    const index = this.selectedGroups.findIndex((g) => g.id === group.id);
    if (index !== -1) {
      this.selectedGroups.splice(index, 1);
    } else {
      this.selectedGroups.push(group);
    }
  }

  isGroupSelected(group: Group): boolean {
    return this.selectedGroups.some((g) => g.id === group.id);
  }
  //End Calendar set-up
  /* **************** */
  //Dialogs
  @ViewChild('sessionDialog') sessionDialog!: TemplateRef<any>;
  sessionDialogRef!: MatDialogRef<any> | undefined;
  @ViewChild('groupsDialog') groupsDialog!: TemplateRef<any>;
  groupsDialogRef!: MatDialogRef<any> | undefined;
  @ViewChild('confirmationDialog') confirmationDialog!: TemplateRef<any>;
  currentDateTime: string = new Date().toISOString().substring(0, 16);
  confirmationDialogRef!: MatDialogRef<any> | undefined;

  confirmAddSessionToday() {
    const currentDateTime = new Date();
    currentDateTime.setHours(currentDateTime.getHours() + 2);

    if (this.sessionTime < currentDateTime.toISOString().substring(0, 5)) {
      this.sessionTime = currentDateTime.toISOString().substring(0, 5);
    }

    this.confirmationDialogRef?.close(true);
  }
  openSessionDialog() {
    if (this.selectedDay !== null) {
      const selectedDate = new Date(
        this.currentYear,
        this.getMonthIndex(this.currentMonth),
        this.selectedDay
      );
      const currentDate = new Date();

      if (selectedDate > currentDate) {
        this.sessionTime = currentDate.toISOString().substring(11, 16);
        this.sessionDialogRef = this.dialog.open(this.sessionDialog);
      } else if (selectedDate.toDateString() === currentDate.toDateString()) {
        this.confirmationDialogRef = this.dialog.open(this.confirmationDialog);
        this.confirmationDialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.sessionTime = new Date(
              currentDate.getTime() + 2 * 60 * 60 * 1000
            )
              .toISOString()
              .substring(11, 16);
            this.sessionDialogRef = this.dialog.open(this.sessionDialog);
          }
        });
      } else {
        this.snackBar.open(
          'Please select a future date for the session',
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          }
        );
      }
    } else {
      this.snackBar.open('Please select a date first', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }

  openGroupsDialog() {
    if (this.selectedTraining) {
      const selectedTraining = this.trainings.find(
        (training) => training.id === this.selectedTraining
      );

      if (selectedTraining) {
        this.groupService.getGroupsByTraining(selectedTraining.id).subscribe(
          (groups) => {
            this.groups = groups;
            this.groupsDialogRef = this.dialog.open(this.groupsDialog);
          },
          (error) => {
            console.error('Failed to load groups:', error);
          }
        );
      } else {
        console.error('Invalid training selected');
      }
    } else {
      console.error('No training selected');
    }
  }
  closeSessionDialog(): void {
    this.sessionDialogRef?.close();
  }

  closeGroupsDialog(): void {
    this.groupsDialogRef?.close();
  }

  cancelAddSessionToday() {
    this.confirmationDialogRef?.close();
  }
}
