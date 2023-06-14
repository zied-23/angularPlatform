import { Component, OnInit } from '@angular/core';
import { calendarData } from './calendar-data';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  calData = calendarData;
  selectedItem: any;
  selectItem(item: any) {
    this.selectedItem = item;
  }
  constructor() {}

  ngOnInit(): void {}
}
