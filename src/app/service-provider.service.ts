import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ServiceProviderService {

  private url: string = "http://localhost:3000/api/v1";
  private options: {
    headers: { "content-type": "application/json", }
  };

  constructor(private http: Http) { }

  getHotels() {
    return this.http.post(this.url + "/hotels")
      .map(this.extractData)
      .do(this.logResponse)
      .catch(this.catchError);
  }
  getHotelsFilter(filter) {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    const requestOptions = {
      headers: new Headers(headerDict)
    };
    return this.http.post(this.url + '/hotels', filter, requestOptions)
      .map(this.extractData)
      .do(this.logResponse)
      .catch(this.catchError);
  }

  private catchError(error: Response | any) {
    console.log(error);
    return Observable.throw(error.json().error || 'Server Error.');
  }

  private logResponse(res: Response) {
    console.log(res);
  }

  private extractData(res: Response) {
    return res.json();
  }

}
