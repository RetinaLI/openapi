import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { XHRBackend, HttpModule, ResponseOptions, Http, Headers, URLSearchParams } from '@angular/http';

import { ServerRoutesService, IServerRoute } from "../config/server-routes.service";
import 'rxjs/add/operator/toPromise';

import * as url from "url";

export interface IResponseData {
  info?: string,
  error_code?: number,
  error_msg?: string,
  count?: number,
  list?: any[],
  [name: string]: any,
  success?: boolean
}
@Injectable()
export class AjaxService {
  private isDevelopment: boolean = !environment.production;

  constructor(private serverRoutesService: ServerRoutesService, private http: Http) {

  }

  call(_action: string, _params?: {} | undefined | null): Promise<IResponseData> {
    let routeConfig = this.serverRoutesService.getRoute(_action);
    let delay = routeConfig.delay;
    if (this.isDevelopment) {
      routeConfig.url = `/mock-api${routeConfig.url}`;
    } else {
      delay = 0;
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this[routeConfig.method](_params, routeConfig));
      }, delay);
    });
  }

  callByUrl(_url: string, _method: "get" | "post" = "get", _params?: {} | undefined | null): Promise<any>{
    if (this.isDevelopment) {
      _url = `/mock-api${_url}`;
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this[_method](_params, {
          url: _url,
          method: _method,
          responseDataIsList: false,
          delay: 0
        }));
      }, 0);
    });
  }

  private get(_params: {} | undefined, _routeConfig: IServerRoute): Promise<IResponseData> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.request(_params, headers, _routeConfig);
  }
  private post(_params: {} | undefined, _routeConfig: IServerRoute): Promise<IResponseData> {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.request(_params, headers, _routeConfig);
  }


  private request(_params, headers: Headers, _routeConfig: IServerRoute): Promise<IResponseData> {
    let _paramKeys = _params && Object.keys(_params) || [];
    let params = new URLSearchParams();
    let promise;
    if (_paramKeys.length > 0) {
      _paramKeys.forEach(p => {
        if (_params[p] !== undefined && _params[p] !== null)
          params.set(p, _params[p]);
      });
    }

    if (_routeConfig.method === "get") {
      promise = this.http.get(_routeConfig.url, { headers, params: _params }).toPromise();
    } else {
      promise = this.http.post(_routeConfig.url, params.toString(), { headers }).toPromise();
    }
    // else {
    //   //错误报告：JSONP injected script did not invoke callback
    //   urlParam.set('callback', 'JSONP_CALLBACK');
    //   promise = this.Jsonp.get(_routeConfig.url, { headers: headers, search: urlParam })
    //     .toPromise();
    // }
    return promise
      .then((response: Response) => {
        return this.extractData(response, _routeConfig);
      })
      .catch((error: any) => {
        return this.handleError(error, _routeConfig);
      });
  }
  private extractData(response: Response, _routeConfig: IServerRoute): IResponseData {
    try {
      let responseUrl = url.parse(response.url);

      if (responseUrl.pathname.indexOf("login.jsp") > -1) {
        document.location.href = "/application/mobile/login.jsp";
        return;
      }

      let body = response.json();
      let result: any = body || {};

      if (_routeConfig.responseDataIsList) {
        result.list = result.list || [];
      }

      return result;
    } catch (ex) {
      throw { error_code: 400, error_msg: ex.toString() }
    }
  }
  private handleError(error: any, _routeConfig: IServerRoute): Promise<IResponseData> {
    let error_code: any, error_msg: any;
    if (error._body && typeof error._body === "string") {
      try {
        let _error = JSON.parse(error._body);
        error_code = _error.error_code;
        error_msg = _error.error_msg;
      } catch (ex) {
        error_code = error.status;
        error_msg = error._body;
      }
    } else {
      error_code = error.error_code || error.code || error.status || 500;
      error_msg = error.error_msg || error.message || error._body || error;
    }
    let error_data: IResponseData = { error_msg: error_msg, error_code: error_code };
    if (_routeConfig.responseDataIsList) {
      error_data.count = 0;
      error_data.list = [];
    }
    if ((error_code + "").startsWith("5")) {
      console.error(error_data.error_msg);
    }
    return Promise.resolve(error_data);
  }
}
