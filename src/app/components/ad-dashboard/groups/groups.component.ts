import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Group } from 'src/app/models/group';
import { GroupService } from 'src/app/services/group.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';
import { Coach, Student } from 'src/app/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TrainingService } from 'src/app/services/training.service';
import { Training } from 'src/app/models/training.model';
@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  group: Group = new Group();
  groups: Group[] = [];
  students: Student[] = [];
  trainings: Training[] = [];
  coaches: Coach[] = [];
  userIdRemove!: string;
  userId!: string;
  lastGroupAlphabet = 'A';
  showGroupDetailsWindow = false;

  constructor(
    private groupService: GroupService,
    private dialog: MatDialog,
    private userService: UsersService,
    private trainingService: TrainingService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllGroups();
    this.getAllStudents();
    this.getAllCoaches();
    this.getAllTrainings();
  }
  getAllGroups(): void {
    this.groupService.getAllGroups().subscribe(
      (groups) => {
        this.groups = groups;
        const usedAlphabets = groups.map((group) => group.name.split(' ')[1]);
        const availableAlphabets = this.getAvailableAlphabets(usedAlphabets);
        this.lastGroupAlphabet =
          availableAlphabets[availableAlphabets.length - 1];
      },
      (error) => {
        console.error('Error retrieving groups:', error);
      }
    );
  }
  getAvailableAlphabets(usedAlphabets: string[]): string[] {
    const allAlphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return allAlphabets
      .split('')
      .filter((alphabet) => !usedAlphabets.includes(alphabet));
  }
  getNextGroupAlphabet(): string {
    const availableAlphabets = this.getAvailableAlphabets(
      this.groups.map((group) => group.name.split(' ')[1])
    );
    return availableAlphabets[0];
  }
  fetchGroups(): void {
    this.groupService.getAllGroups().subscribe(
      (groups) => {
        this.groups = groups;
      },
      (error) => {
        console.error('Error retrieving groups:', error);
      }
    );
  }
  createGroup(): void {
    const nextGroupAlphabet = this.getNextGroupAlphabet();
    this.group.name = 'Group ' + nextGroupAlphabet;
    this.group.creationDate = new Date();
    this.groupService.createGroup(this.group).subscribe(
      (response) => {
        console.log('Group created successfully:', response);
        this.fetchGroups();
      },
      (error) => {
        console.log('Error creating group:', error);
      }
    );
  }

  /*getGroupByName(grouName: string) {
    this.groupService.getGroupByName(grouName).subscribe(
      (group) => {
        console.log('Group:', group);
      },
      (error) => {
        console.error('Error retrieving group:', error);
      }
    );
  }*/

  addUserToGroup(groupId: string, userId: string) {
    const group = this.groups.find((g) => g.id === groupId); // Find the group by its id
    if (!group) {
      console.error('Group not found');
      return;
    }

    if (group.userIds.includes(userId)) {
      this.snackBar.open('User already exists in the group', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      return;
    }

    this.groupService.addUserToGroup(groupId, userId).subscribe(
      (response) => {
        console.log(response);
        this.snackBar.open('Added To the Group Succesfully ', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        group.userIds.push(userId);
      },
      (error) => {
        console.error('Error adding user to group:', error);
      }
    );
  }
  getCoachName(coachId: string): string {
    const coach = this.coaches.find((coach) => coach.id === coachId);
    return coach ? coach.fullname : '';
  }
  getTrainingName(trainingId: string): string {
    const training = this.trainings.find(
      (training) => training.id === trainingId
    );
    return training ? training.name : '';
  }
  getAllStudents(): void {
    this.userService.getAllStudents().subscribe(
      (students) => {
        this.students = students;
      },
      (error) => {
        console.error('Error retrieving students:', error);
      }
    );
  }
  getAllTrainings(): void {
    this.trainingService.getAllTrainings().subscribe(
      (trainings) => {
        this.trainings = trainings;
      },
      (error) => {
        console.error('Error retrieving trainings:', error);
      }
    );
  }

  getAllCoaches(): void {
    this.userService.getAllCoaches().subscribe(
      (coaches) => {
        this.coaches = coaches;
      },
      (error) => {
        console.error('Error retrieving coaches:', error);
      }
    );
  }

  removeUserFromGroup(groupId: string, userId: string) {
    this.groupService.removeUserFromGroup(groupId, userId).subscribe(
      () => {
        console.log('User removed from group successfully');
      },
      (error) => {
        console.error('Error removing user from group:', error);
      }
    );
  }
  @ViewChild('groupDialog') groupDialog!: TemplateRef<any>;
  groupDialogRef!: MatDialogRef<any> | undefined;

  @ViewChild('addUserDialog') addUserDialog!: TemplateRef<any>;
  addUserDialogRef!: MatDialogRef<any> | undefined;

  openGroupDialog(): void {
    this.groupDialogRef = this.dialog.open(this.groupDialog);
    //this.getAllTrainings();
    //this.getAllCoaches();
  }
  openAddUserDialog(groupId: string): void {
    this.group.id = groupId;
    this.addUserDialogRef = this.dialog.open(this.addUserDialog);
  }
  closeAddUserDialog(): void {
    this.addUserDialogRef?.close();
  }

  closeGroupDialog(): void {
    this.groupDialogRef?.close();
  }
}
