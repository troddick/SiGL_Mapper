import {Injectable} from "@angular/core";
import {Headers}    from "@angular/http";

@Injectable()
export class CONFIG {
    private static baseURL: string = "http://sigl.wim.usgs.gov/SiGLServices/";

    public static get PARAMETERS_URL(): string { return this.baseURL + "Parameters"; };
    public static get PROJ_DURATIONS_URL(): string { return this.baseURL + "ProjectDuration"; };
    public static get PROJ_STATUS_URL(): string { return this.baseURL + "ProjectStatus"; };
    public static get RESOURCES_URL(): string { return this.baseURL + "ResourceTypes"; };
    public static get MEDIA_URL(): string { return this.baseURL + "Media"; };
    public static get LAKES_URL(): string { return this.baseURL + "Lakes"; };
    public static get STATES_URL(): string { return this.baseURL + "sites/StatesWithSites"; };
    public static get MONITOR_EFFORTS_URL(): string { return this.baseURL + "MonitorCoordinations"; };
    public static get FILTERED_SITES(): string { return this.baseURL + "sites/FilteredSites.json"; };


    public static get MIN_JSON_HEADERS() { return new Headers({ "Accept": "application/json" }); };
    public static get JSON_HEADERS() { return new Headers({ "Accept": "application/json", "Content-Type": "application/json" }); };

}