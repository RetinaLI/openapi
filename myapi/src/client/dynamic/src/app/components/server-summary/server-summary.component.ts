import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CarService } from "../../services/car.service";

@Component({
  selector: 'app-server-summary',
  templateUrl: './server-summary.component.html',
  styleUrls: ['./server-summary.component.less']
})
export class ServerSummaryComponent implements OnInit, OnDestroy {
  allCarNum = 0;
  onlineToday = 0;
  offlineToday = 0;
  runToday = 0;
  stopToday = 0;

  timeTask;
  destroy = false;

  constructor(private router: Router, private carService: CarService) { }

  ngOnInit() {
    this.bindSummary();
  }

  ngOnDestroy(){
    this.destroy = true;
    if(this.timeTask) {
      clearTimeout(this.timeTask);
    }
  }

  redirectTo(){
    this.router.navigate(["/car/index.jsp"]);
  }

  bindSummary() {
    if(this.destroy) return;
    this.carService.getOnlineSummary().then(result => {
      this.allCarNum = result.onlineMap.ALLNUM;
      this.onlineToday = result.onlineMap.ONLINENUM;
      this.offlineToday = result.onlineMap.OFFLINENUM;
      this.runToday = result.onlineMap.todayRunCount;
      this.stopToday = result.onlineMap.ONLINENUM - this.runToday;
      this.timeTask = setTimeout(() => {
        this.bindSummary();
      }, 2000);
    });
  }

}
