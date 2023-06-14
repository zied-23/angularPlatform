import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Coach } from 'src/app/models/user';
import { RegistrationService } from 'src/app/services/registration.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-coachs',
  templateUrl: './coachs.component.html',
  styleUrls: ['./coachs.component.scss'],
})
export class CoachsComponent implements OnInit {
  coachs: Coach[] = [];
  coach: Coach = new Coach();
  selectedCoachs: Coach[] = [];
  previousStatus!: string;
  showAddForm: boolean = false;
  searchQuery: string = '';
  filteredCoachs: Coach[] = [];
  filterField: string = 'username';
  constructor(
    private coachService: UsersService,
    private registrationService: RegistrationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCoachs();
  }

  fetchCoachs(): void {
    this.coachService.getAllCoaches().subscribe(
      (coachs) => {
        this.coachs = coachs;
      },
      (error) => {
        console.error('Error retrieving students:', error);
      }
    );
  }

  registerCoach() {
    this.coach.joinDate = new Date();
    this.registrationService.registerCoach(this.coach).subscribe(
      (response) => {
        console.log('Coach registered successfully:', response);
        this.fetchCoachs();
        this.loadCoachs();
        this.closeCoachDialog();
      },
      (error) => {
        console.error('Error registering Coach:', error);
      }
    );
  }

  toggleCoachSelection(coach: Coach): void {
    coach.selected = !coach.selected;
    if (coach.selected) {
      this.selectedCoachs.push(coach);
    } else {
      const index = this.selectedCoachs.indexOf(coach);
      if (index > -1) {
        this.selectedCoachs.splice(index, 1);
      }
    }
  }

  selectAllCoaches(): void {
    this.coachs.forEach((coach) => {
      coach.selected = true;
      this.selectedCoachs.push(coach);
    });
  }

  deselectAllCoaches(): void {
    this.coachs.forEach((coach) => {
      coach.selected = false;
    });
    this.selectedCoachs = [];
  }

  /*enterEditMode(coach: Coach): void {
    this.previousStatus = coach.cv;
    coach.editMode = true;
  }*/

  confirmUpdate(coach: Coach): void {
    this.coachService.updateCoach(coach.id, coach).subscribe(
      (response) => {
        console.log('Student updated successfully:', response);
        coach.editMode = false;
        this.fetchCoachs();
      },
      (error) => {
        console.error('Error updating student:', error);
      }
    );
  }
  getStatusStyle(status: string): any {
    let color = '';
    let bg = '';

    if (status === 'PAID') {
      color = '#04C100';
      bg = 'rgba(15, 218, 36, 0.05)';
    } else if (status === 'UNPAID') {
      color = '#FAB555';
      bg = 'rgba(250, 181, 85, 0.05)';
    } else if (status === 'PENDING') {
      color = '#D80000';
      bg = 'rgba(216, 0, 0, 0.05)';
    }

    return {
      color: color,
      'background-color': bg,
    };
  }
  @ViewChild('coachDialog') coachDialog!: TemplateRef<any>;
  coachDialogRef!: MatDialogRef<any> | undefined;

  openCoachDialog(): void {
    this.coachDialogRef = this.dialog.open(this.coachDialog);
    this.loadCoachs();
  }

  closeCoachDialog(): void {
    this.coachDialogRef?.close();
  }
  loadCoachs(): void {
    this.coachService.getAllCoaches().subscribe(
      (coachs: Coach[]) => {
        this.coachs = coachs;
        this.filteredCoachs = coachs;
      },
      (error) => {
        console.error('Error retrieving Coachs:', error);
      }
    );
  }
  /*filterStudents(): void {
    if (!this.searchQuery) {
      this.filteredStudents = this.students;
    } else {
      this.filteredStudents = this.students.filter((student) =>
        student.username.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }*/
  filterCoachs(): void {
    if (!this.searchQuery) {
      this.filteredCoachs = this.coachs;
    } else {
      this.filteredCoachs = this.coachs.filter((coach) =>
        this.getCoachPropertyValue(coach, this.filterField)
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    }
  }

  getCoachPropertyValue(coach: Coach, property: any): any {
    switch (property) {
      case 'username':
        return coach.username;
      case 'email':
        return coach.email;
      case 'phone':
        return coach.phone;
      case 'fullname':
        return coach.fullname;
      case 'status':
        return coach.joinDate;
      default:
        return '';
    }
  }
}
