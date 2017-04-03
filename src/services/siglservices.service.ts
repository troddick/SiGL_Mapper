import { Injectable }   from "@angular/core";
import { Http, Response, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { Observable }   from "rxjs/Observable";
import { Subject }      from "rxjs/Subject";
import { CONFIG } from "./config";
import {Iproject} from "../app/interfaces/project.interface";
import {IsitesFilter} from "../app/interfaces/sitesFilter.interface";
import {Ifullsite} from "../app/interfaces/fullsite.interface";
import {Isite} from "../app/interfaces/site.interface";
import {Iparameter} from "../app/interfaces/parameter.interface";
import {IprojDuration} from "../app/interfaces/projduration.interface";
import {IprojStatus} from "../app/interfaces/projstatus.interface";
import {Iresource} from "../app/interfaces/resource.interface";
import {Imedia} from "../app/interfaces/media.interface";
import {Ilake} from "../app/interfaces/lake.interface";
import {Ifullproject} from "../app/interfaces/fullproject.interface";
import {ImonitorEffort} from "../app/interfaces/monitoreffort.interface";
import {Iorganization} from "../app/interfaces/organization.interface";
import {Iobjective} from "../app/interfaces/objective.interface";

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
        this.getProjects();
        this.getOrganizations();
        this.getObjectives();
    }

    //show the filter modal in the mainview
    private _showHideFilters: Subject<boolean> = new Subject<boolean>();
    public set showModal(something:any){
        this._showHideFilters.next(something);
    }
    //show the filter modal in the mainview
    public get showModal():any{
        return this._showHideFilters.asObservable();
    }
    //////////// getSites ///////////////////////////////////
    private _filteredSites: Subject<Array<Isite>> = new Subject<Array<Isite>>();
    public get sites(): Observable<Array<Isite>> {
        return this._filteredSites.asObservable();
    }
    public filteredSites(s: IsitesFilter, whichTab: string){
        let siteParams: URLSearchParams = new URLSearchParams();
        if (whichTab == "project"){
            // ?ProjOrg=&ProjObjs=&Duration=&ProjMonitorCoords=1&Status=&Lake=&State=   (ProjectTab)
            siteParams.set("ProjOrg", s.p_organizations.toString());
            siteParams.set("ProjMonitorCoords", s.p_monitorEffect.join(","));
            siteParams.set("ProjObjs", s.p_objectives.join(","));
            siteParams.set("Duration", s.p_projDuration.join(","));
            siteParams.set("Status", s.p_projStatus.join(","));
            siteParams.set("Lake", s.p_lakes.join(","));
            siteParams.set("State", s.p_states.join(","));
        } else {
            // ?Parameters=45&Duration=&Status=&ResComp=&Media=&Lake=&State=&ProjMonitorCoords= (SiteTab)
            siteParams.set("Parameters", s.s_parameters.join(","));
            siteParams.set("Duration", s.s_projDuration.join(","));
            siteParams.set("Status", s.s_projStatus.join(","));
            siteParams.set("ResComp", s.s_resources.join(","));
            siteParams.set("Media", s.s_media.join(","));
            siteParams.set("Lake", s.s_lakes.join(","));
            siteParams.set("State", s.s_states.join(","));
            siteParams.set("ProjMonitorCoords", s.s_monitorEffect.join(","));
        }        

        let options = new RequestOptions({ headers: CONFIG.MIN_JSON_HEADERS, search: siteParams });
        this._http.get(CONFIG.FILTERED_SITES_URL, options)
            .map(res => <Array<Isite>>res.json()).subscribe(site => {
                this._filteredSites.next(site);
            }, error => this.handleError);
    }

    /////////// getProjectFullSites /////////////////////////////////////
    private _fullSites: Subject<Array<Ifullsite>> = new Subject<Array<Ifullsite>>();
    public get projectFullSites(): Observable<Array<Ifullsite>> {
        return this._fullSites.asObservable();
    }
    private _fullProject: Subject<Ifullproject> = new Subject<Ifullproject>();
    public get fullProject(): Observable<Ifullproject> {
        return this._fullProject.asObservable();
    }
    //the project was chosen, go get fullProject and the list of FullSites
    public set project(p: Iproject){
        let options = new RequestOptions({ headers: CONFIG.MIN_JSON_HEADERS});
        //get fullProject Projects/GetFullProject.json?ByProject=2098
        this._http.get(CONFIG.PROJECT_URL + "/GetFullProject.json?ByProject="+ p.project_id, options)
            .map(res => <Ifullproject>res.json()).subscribe(fp => {
                this._fullProject.next(fp);
                 // get fullSites list
                 this._http.get(CONFIG.PROJECT_URL + "/"+ p.project_id + "/ProjectFullSites", options)
                     .map(res => <Array<Ifullsite>>res.json()).subscribe(fs => {
                         this._fullSites.next(fs);
                     }, error => this.handleError);
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

    //////////// MONITOR EFFORTS ///////////////////////////
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

    ///////////////// PROJECTS //////////////////////
    private _projectSubject: Subject<Array<Iproject>> = new Subject<Array<Iproject>>();
    // getter
    public get projects(): Observable<Array<Iproject>> {
        return this._projectSubject.asObservable();
    }
    // http request
    private getProjects(): void {
        let options = new RequestOptions({ headers: CONFIG.MIN_JSON_HEADERS });
        this._http.get(CONFIG.PROJECT_URL, options)
            .map(res => <Array<Iproject>>res.json()).subscribe(p => {
                this._projectSubject.next(p);
            }, error => this.handleError);
    }

    //////////// ORGANIZATIONS ///////////////////////////
    private _organizationSubject: Subject<Array<Iorganization>> = new Subject<Array<Iorganization>>();
    // getter
    public get organizations(): Observable<Array<Iorganization>> {
        return this._organizationSubject.asObservable();
    }
    // http request
    private getOrganizations(): void {
        let options = new RequestOptions({ headers: CONFIG.MIN_JSON_HEADERS });
        this._http.get(CONFIG.ORGANIZATION_URL, options)
            .map(res => <Array<Iorganization>>res.json()).subscribe(o => {
                this._organizationSubject.next(o);
            }, error => this.handleError);
    }

    //////////// OBJECTIVES ///////////////////////////
    private _objectiveSubject: Subject<Array<Iobjective>> = new Subject<Array<Iobjective>>();
    // getter
    public get objectives(): Observable<Array<Iobjective>> {
        return this._objectiveSubject.asObservable();
    }
    // http request
    private getObjectives(): void {
        let options = new RequestOptions({ headers: CONFIG.MIN_JSON_HEADERS });
        this._http.get(CONFIG.OBJECTIVE_URL, options)
            .map(res => <Array<Iobjective>>res.json())
            .subscribe(obj => {
                this._objectiveSubject.next(obj);
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