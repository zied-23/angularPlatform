import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss'],
  //providers: [BigBlueButtonService],
})
export class MeetingComponent {
  //public meetingUrl!: string;
  //constructor(private bigbluebuttonService: BigBlueButtonService) {}
  ngOnInit() {
    /*this.bigbluebuttonService
      .createMeeting('My Meeting', 'attendeePassword', 'moderatorPassword')
      .subscribe(
        (response) => {
          console.log('Meeting created: ' + response);
          this.meetingUrl =
            'https://bbb.serverside.com/bigbluebutton/api/join?fullName=John%20Doe&meetingID=' +
            response +
            '&password=attendeePassword';
        },
        (error) => {
          console.error('Error creating meeting: ' + error);
        }
      );*/
  }
}
