import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Student } from 'src/app/models/user';
import { RegistrationService } from 'src/app/services/registration.service';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  student: Student = new Student();
  selectedStudents: Student[] = [];
  previousStatus!: string;
  showAddForm: boolean = false;
  searchQuery: string = '';
  filteredStudents: Student[] = [];
  filterField: string = 'username';
  constructor(
    private studentService: UsersService,
    private registrationService: RegistrationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  fetchStudents(): void {
    this.studentService.getAllStudents().subscribe(
      (students) => {
        this.students = students;
      },
      (error) => {
        console.error('Error retrieving students:', error);
      }
    );
  }

  registerStudent() {
    this.registrationService.registerStudent(this.student).subscribe(
      (response) => {
        console.log('Student registered successfully:', response);
        this.fetchStudents();
        this.loadStudents();
        this.closeStudentDialog();
      },
      (error) => {
        console.error('Error registering student:', error);
      }
    );
  }

  toggleStudentSelection(student: Student): void {
    student.selected = !student.selected;
    if (student.selected) {
      this.selectedStudents.push(student);
    } else {
      const index = this.selectedStudents.indexOf(student);
      if (index > -1) {
        this.selectedStudents.splice(index, 1);
      }
    }
  }

  selectAllStudents(): void {
    this.students.forEach((student) => {
      student.selected = true;
      this.selectedStudents.push(student);
    });
  }

  deselectAllStudents(): void {
    this.students.forEach((student) => {
      student.selected = false;
    });
    this.selectedStudents = [];
  }

  enterEditMode(student: Student): void {
    this.previousStatus = student.status;
    student.editMode = true;
  }

  confirmUpdate(student: Student): void {
    this.studentService.updateStudent(student.id, student).subscribe(
      (response) => {
        console.log('Student updated successfully:', response);
        student.editMode = false;
        this.fetchStudents();
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
  @ViewChild('studentDialog') studentDialog!: TemplateRef<any>;
  studentDialogRef!: MatDialogRef<any> | undefined;

  openStudentDialog(): void {
    this.studentDialogRef = this.dialog.open(this.studentDialog);
    this.loadStudents();
  }

  closeStudentDialog(): void {
    this.studentDialogRef?.close();
  }
  loadStudents(): void {
    this.studentService.getAllStudents().subscribe(
      (students: Student[]) => {
        this.students = students;
        this.filteredStudents = students;
      },
      (error) => {
        console.error('Error retrieving students:', error);
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
  filterStudents(): void {
    if (!this.searchQuery) {
      // If search query is empty, show all students
      this.filteredStudents = this.students;
    } else {
      // Filter students based on selected filtering field and search query
      this.filteredStudents = this.students.filter((student) =>
        this.getStudentPropertyValue(student, this.filterField)
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    }
  }

  getStudentPropertyValue(student: Student, property: string): string {
    // Map the selected filtering field to the corresponding student property value
    switch (property) {
      case 'username':
        return student.username;
      case 'email':
        return student.email;
      case 'phone':
        return student.phone;
      case 'fullname':
        return student.fullname;
      case 'status':
        return student.status;
      default:
        return '';
    }
  }
}
