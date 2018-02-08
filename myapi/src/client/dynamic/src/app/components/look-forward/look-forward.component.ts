import { Component, OnInit } from '@angular/core';
import { MissionService } from '../../providers/mission.service';

@Component({
  selector: 'app-look-forward',
  templateUrl: './look-forward.component.html',
  styleUrls: ['./look-forward.component.css']
})
export class LookForwardComponent implements OnInit {

  constructor(private missionService: MissionService) {

    this.missionService.confirmMission({
      action: "locationChanged", params: {
        menu: {
          name: "LOOK FORWARD"
        }
      }
    });
  }

  ngOnInit() {
  }
}
