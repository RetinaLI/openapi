import { ControlAnchor, NavigationControlType } from "angular2-baidu-map";

export class CustomBaiduMapOption {
  public ak = "";
  private defaultOpts = {
    center: {
      longitude: 121.506191,
      latitude: 31.245554
    },
    zoom: 17,
    geolocationCtrl: {
      offset: {
        width: 20,
        height: 150
      },
      anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_LEFT
    },
    scaleCtrl: {
      offset: {
        width: 60,
        height: 150
      },
      anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_RIGHT
    },
    overviewCtrl: {
      isOpen: false
    },
    navCtrl: {
      type: NavigationControlType.BMAP_NAVIGATION_CONTROL_LARGE,
      offset: {
        width: 20,
        height: 150
      }
    }
  };
  private offlineOpts = {
    retryInterval: 5000,
    txt: 'NO-NETWORK'
  };

  public getOptions (_opts: any = {}){
    return $.extend(true, {}, this.defaultOpts, _opts);
  }

  public getOfflineOptions(_opts: any = {}){
    return $.extend(true, {}, this.offlineOpts, _opts);
  }
}