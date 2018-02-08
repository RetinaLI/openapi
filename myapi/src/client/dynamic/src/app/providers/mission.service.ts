import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

interface IMission{
  action: string,
  params?: any
}

@Injectable()
export class MissionService {

  // Observable string sources
  // private missionAnnouncedSource = new Subject<IMission>();
  private missionConfirmedSource = new Subject<IMission>();

  // Observable string streams
  // missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  missionConfirmed$ = this.missionConfirmedSource.asObservable();

  // // Service message commands
  // announceMission(mission: IMission) {
  //   this.missionAnnouncedSource.next(mission);
  // }

  confirmMission(astronaut: IMission) {
    this.missionConfirmedSource.next(astronaut);
  }
}