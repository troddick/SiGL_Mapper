import { Injectable }   from "@angular/core";
import { Http, Response, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { Observable }   from "rxjs/Observable";
import { Subject }      from "rxjs/Subject";
import { CONFIG } from "./config";
import {IsitesFilter} from "../app/interfaces/sitesFilter.interface";
import {Isite} from "../app/interfaces/site.interface";
import {Iparameter} from "../app/interfaces/parameter.interface";
import {IprojDuration} from "../app/interfaces/projduration.interface";
import {IprojStatus} from "../app/interfaces/projstatus.interface";
import {Iresource} from "../app/interfaces/resource.interface";
import {Imedia} from "../app/interfaces/media.interface";
import {Ilake} from "../app/interfaces/lake.interface";
// import {Istate} from "../app/interfaces/state.interface";
import {ImonitorEffort} from "../app/interfaces/monitoreffort.interface";

@Injectable()
export class SiGLService {
    constructor(private _http: Http) {
        this.getParameters();
        this.getProjDurations();
        this.getProjStatuses();
        this.getResources();
        this.getMedia();
        this.getLakes();
        this.getStates();
        this.getMonitorEfforts();
    }

    //////////// getSites ///////////////////////////////////
    private _filteredSites: Subject<Array<Isite>> = new Subject<Array<Isite>>();
    public get sites(): Observable<Array<Isite>> {
        return this._filteredSites.asObservable();
    }
    public set filteredSites(s: IsitesFilter){
        // ?Parameters=45&Duration=&Status=&ResComp=&Media=&Lake=&State=&ProjMonitorCoords=
        let siteParams: URLSearchParams = new URLSearchParams();
        siteParams.set("Parameters", s.parameters.join(","));
        siteParams.set("Duration", s.projDuration.join(","));
        siteParams.set("Status", s.projStatus.join(","));
        siteParams.set("ResComp", s.resources.join(","));
        siteParams.set("Media", s.media.join(","));
        siteParams.set("Lake", s.lakes.join(","));
        siteParams.set("State", s.states.join(","));
        siteParams.set("ProjMonitorCoords", s.monitorEffect.join(","));

        let options = new RequestOptions({ headers: CONFIG.MIN_JSON_HEADERS, search: siteParams });
        this._http.get(CONFIG.FILTERED_SITES, options)
            .map(res => <Array<Isite>>res.json()).subscribe(s => {
                this._filteredSites.next(s);
            }, error => this.handleError);
    }

    //////////// PARAMETERS ///////////////////////////
    private _parameterSubject: Subject<Array<Iparameter>> = new Subject<Array<Iparameter>>();
    // getter
    public get parameters(): Observable<Array<Iparameter>> {
        return this._parameterSubject.asObservable();
    }
    // http request
    private getParameters(): void {
        let options = new RequestOptions({ headers: CONFIG.MIN_JSON_HEADERS });
        this._http.get(CONFIG.PARAMETERS_URL, options)
            .map(res => <Array<Iparameter>>res.json()).subscribe(p => {
                this._parameterSubject.next(p);
            }, error => this.handleError);
    }

    //////////// PROJECTDURATIONS ///////////////////////////
    private _projDuratSubject: Subject<Array<IprojDuration>> = new Subject<Array<IprojDuration>>();
    // getter
    public get projDurations(): Observable<Array<IprojDuration>> {
        return this._projDuratSubject.asObservable();
    }
    // http request
    private getProjDurations(): void {
        let options = new RequestOptions({headers: CONFIG.MIN_JSON_HEADERS});
        this._http.get(CONFIG.PROJ_DURATIONS_URL, options)
            .map(res => <Array<IprojDuration>>res.json()).subscribe(pd => {
                this._projDuratSubject.next(pd);
            }, error => this.handleError);
    }

    //////////// PROJECTSTATUS ///////////////////////////
    private _projStatSubject: Subject<Array<IprojStatus>> = new Subject<Array<IprojStatus>>();
    // getter
    public get projStatuses(): Observable<Array<IprojStatus>> {
        return this._projStatSubject.asObservable();
    }
    // http request
    private getProjStatuses(): void {
        let options = new RequestOptions({headers: CONFIG.MIN_JSON_HEADERS});
        this._http.get(CONFIG.PROJ_STATUS_URL, options)
            .map(res => <Array<IprojStatus>>res.json()).subscribe(ps => {
                this._projStatSubject.next(ps);
            }, error => this.handleError);
    }

    //////////// RESOURCES ///////////////////////////
    private _resourceSubject: Subject<Array<Iresource>> = new Subject<Array<Iresource>>();
    // getter
    public get resources(): Observable<Array<Iresource>> {
        return this._resourceSubject.asObservable();
    }
    // http request
    private getResources(): void {
        let options = new RequestOptions({headers: CONFIG.MIN_JSON_HEADERS});
        this._http.get(CONFIG.RESOURCES_URL, options)
            .map(res => <Array<Iresource>>res.json()).subscribe(r => {
                this._resourceSubject.next(r);
            }, error => this.handleError);
    }

    //////////// MEDIA ///////////////////////////
    private _mediaSubject: Subject<Array<Imedia>> = new Subject<Array<Imedia>>();
    // getter
    public get media(): Observable<Array<Imedia>> {
        return this._mediaSubject.asObservable();
    }
    // http request
    private getMedia(): void {
        let options = new RequestOptions({headers: CONFIG.MIN_JSON_HEADERS});
        this._http.get(CONFIG.MEDIA_URL, options)
            .map(res => <Array<Imedia>>res.json()).subscribe(m => {
                this._mediaSubject.next(m);
            }, error => this.handleError);
    }

    //////////// LAKES ///////////////////////////
    private _lakeSubject: Subject<Array<Ilake>> = new Subject<Array<Ilake>>();
    // getter
    public get lakes(): Observable<Array<Ilake>> {
        return this._lakeSubject.asObservable();
    }
    // http request
    private getLakes(): void {
        let options = new RequestOptions({headers: CONFIG.MIN_JSON_HEADERS});
        this._http.get(CONFIG.LAKES_URL, options)
            .map(res => <Array<Ilake>>res.json()).subscribe(l => {
                this._lakeSubject.next(l);
            }, error => this.handleError);
    }

    //////////// STATES ///////////////////////////
    private _stateSubject: Subject<Array<any>> = new Subject<Array<any>>();
    // getter
    public get states(): Observable<Array<any>> {
        return this._stateSubject.asObservable();
    }
    // http request
    private getStates(): void {
        let options = new RequestOptions({headers: CONFIG.MIN_JSON_HEADERS});
        this._http.get(CONFIG.STATES_URL, options)
            .map(res => <Array<any>>res.json()).subscribe(s => {
                this._stateSubject.next(s);
            }, error => this.handleError);
    }

    //////////// STATES ///////////////////////////
    private _monEffortSubject: Subject<Array<ImonitorEffort>> = new Subject<Array<ImonitorEffort>>();
    // getter
    public get monitorEfforts(): Observable<Array<ImonitorEffort>> {
        return this._monEffortSubject.asObservable();
    }
    // http request
    private getMonitorEfforts(): void {
        let options = new RequestOptions({headers: CONFIG.MIN_JSON_HEADERS});
        this._http.get(CONFIG.MONITOR_EFFORTS_URL, options)
            .map(res => <Array<ImonitorEffort>>res.json()).subscribe(me => {
                this._monEffortSubject.next(me);
            }, error => this.handleError);
    }

    private handleError(error: Response) {
        // TODO figure out a better error handler
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }
}