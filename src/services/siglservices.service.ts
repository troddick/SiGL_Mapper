import { Injectable }   from "@angular/core";
import { Http, Response, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { Observable }   from "rxjs/Observable";
import { Subject }      from "rxjs/Subject";
import { CONFIG } from "./config";
import {Iparameter} from "../app/interfaces/sitesFilter.interface";
import {IprojDuration} from "../app/interfaces/sitesFilter.interface";
import {IprojStatus} from "../app/interfaces/sitesFilter.interface";
import {Iresource} from "../app/interfaces/sitesFilter.interface";
import {Imedia} from "../app/interfaces/sitesFilter.interface";
import {Ilake} from "../app/interfaces/sitesFilter.interface";
import {Istate} from "../app/interfaces/sitesFilter.interface";
import {ImonitorEffort} from "../app/interfaces/sitesFilter.interface";

@Injectable()
export class SiGLService {
    constructor(private _http: Http){
        this.getParameters();
        this.getProjDurations();
      //  this.getProjStatus();
      //  this.getResources();
      //  this.getMedia();
      //  this.getLakes();
      //  this.getStates();
     //   this.getMonitorEfforts();
    }
    //////////// PARAMETERS ///////////////////////////
    private _parameterSubject: Subject<Array<Iparameter>> = new Subject<Array<Iparameter>>();
    // getter
    public get parameters(): Observable<Array<Iparameter>> {
        return this._parameterSubject.asObservable();
    }
    private getParameters():void {
        let options = new RequestOptions({headers:CONFIG.MIN_JSON_HEADERS});
        this._http.get(CONFIG.PARAMETERS_URL, options)
            .map(res=> <Array<Iparameter>>res.json()).subscribe(p => {
                this._parameterSubject.next(p);
            }, error => this.handleError);
    }
    
    //////////// PROJECTDURATIONS ///////////////////////////
    private _projDuratSubject: Subject<Array<IprojDuration>> = new Subject<Array<IprojDuration>>();
    // getter
    public get projDurations(): Observable<Array<IprojDuration>> {
        return this._projDuratSubject.asObservable();
    }
    private getProjDurations():void {
        let options = new RequestOptions({headers:CONFIG.MIN_JSON_HEADERS});
        this._http.get(CONFIG.PROJ_DURATIONS_URL, options)
            .map(res => <Array<IprojDuration>>res.json()).subscribe(pd => {
                this._projDuratSubject.next(pd);
            }, error => this.handleError);
    }




    private handleError(error: Response) {
        // TODO figure out a better error handler
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}