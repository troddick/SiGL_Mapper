import {Component} from "@angular/core";
import { Observable } from "rxjs/Observable";
import {SiGLService} from "../../services/siglservices.service";
import {IsitesFilter} from "../interfaces/sitesFilter.interface";
import {Isite} from "../interfaces/site.interface";
import {Iparameter} from "../interfaces/parameter.interface";
import {IprojDuration} from "../interfaces/projduration.interface";
import {IprojStatus} from "../interfaces/projstatus.interface";
import {Iresource} from "../interfaces/resource.interface";
import {Imedia} from "../interfaces/media.interface";
import {Ilake} from "../interfaces/lake.interface";
import {Istate} from "../interfaces/state.interface";
import {ImonitorEffort} from "../interfaces/monitoreffort.interface";
import { IMultiSelectOption, IMultiSelectSettings  } from "angular-2-dropdown-multiselect";

@Component({
    selector: "sidebar",
    template: require<any>("./sidebar.component.html"),
    styles: [
        require<any>("./sidebar.component.less"),
        require<any>("../../styles/main.less")
    ],
    providers: []
})
export class SidebarComponent {
    public selectedTabName: string;
    public parameterMulti: Array<IMultiSelectOption>; // dropdown multiselect contents
    public parameterSelected: Array<number>; // holds ids of selected
    public projDurationMulti: Array<IMultiSelectOption>;  // dropdown multiselect contents
    public projDurationSelected: Array<number>; // holds ids of selected
    public projStatusMulti: Array<IMultiSelectOption>; // dropdown multiselect contents
    public projStatusSelected: Array<number>; // holds ids of selected
    public resourceMulti: Array<IMultiSelectOption>; // dropdown multiselect contents
    public resourseSelected: Array<number>; // holds ids of selected
    public mediaMulti: Array<IMultiSelectOption>; // dropdown multiselect contents
    public mediaSelected: Array<number>; // holds ids of selected
    public lakeMulti: Array<IMultiSelectOption>; // dropdown multiselect contents
    public lakeSelected: Array<number>; // holds ids of selected
    public stateMulti: Array<IMultiSelectOption>; // dropdown multiselect contents
    public stateSelected: Array<string>; // holds ids of selected
    public monitorEffortMulti: Array<IMultiSelectOption>; // dropdown multiselect contents
    public monitorEffortSelected: Array<number>; // holds ids of selected
    public siteFilters: IsitesFilter; // holds arrays of selected values to pass to services
    public multiSettings: IMultiSelectSettings; // setting to try and get optgroup as selectable (not working)
    public filteredSites: Array<Isite>; // sites returned from "Search"
    
    constructor(private _siglService: SiGLService) {
        this.selectedTabName = "sites";
    }
    ngOnInit() {
        this.multiSettings = {selectionLimit: 0, autoUnselect: false};
        // instantiate
        this.siteFilters = { lakes: [], media: [], monitorEffect: [], parameters: [],
            projDuration: [], projStatus: [], resources: [], states: []};
        // populate dropdowns
        this._siglService.parameters.subscribe((p: Array<Iparameter>) => {
            this.parameterMulti = []; // instantiate
            this.parameterMulti.push({id: "Biological", name: "Biological", isLabel: true });
            p.forEach((pl) => {
                if (pl.parameter_group === "Biological")
                    this.parameterMulti.push({id: pl.parameter_type_id, name: pl.parameter});
            });
            this.parameterMulti.push({id: "Chemical", name: "Chemical", isLabel: true });
            p.forEach((pl) => {
                if (pl.parameter_group === "Chemical")
                    this.parameterMulti.push({id: pl.parameter_type_id, name: pl.parameter});
            });
            this.parameterMulti.push({id: "Microbiological", name: "Microbiological", isLabel: true });
            p.forEach((pl) => {
                if (pl.parameter_group === "Microbiological")
                    this.parameterMulti.push({id: pl.parameter_type_id, name: pl.parameter});
            });
            this.parameterMulti.push({id: "Physical", name: "Physical", isLabel: true });
            p.forEach((pl) => {
                if (pl.parameter_group === "Physical")
                    this.parameterMulti.push({id: pl.parameter_type_id, name: pl.parameter});
            });
            this.parameterMulti.push({id: "Toxicological", name: "Toxicological", isLabel: true });
             p.forEach((pl) => {
                if (pl.parameter_group === "Toxicological")
                    this.parameterMulti.push({id: pl.parameter_type_id, name: pl.parameter});
            });
        });
        this._siglService.projDurations.subscribe((pd: Array<IprojDuration>) => {
           this.projDurationMulti = []; // instantiate
           pd.forEach((pdl) => {
               this.projDurationMulti.push({ id: pdl.proj_duration_id, name: pdl.duration_value});
            });
        });
        this._siglService.projStatuses.subscribe((ps: Array<IprojStatus>) => {
            this.projStatusMulti = []; // instantiate
            ps.forEach((psl) => {
                this.projStatusMulti.push({id: psl.proj_status_id, name: psl.status_value});
            });
        });
        this._siglService.resources.subscribe((r: Array<Iresource>) => {
            this.resourceMulti = []; // instantiate
            r.forEach((rl) => {
                this.resourceMulti.push({id: rl.resource_type_id, name: rl.resource_name});
            });
        });
        this._siglService.media.subscribe((m: Array<Imedia>) => {
            this.mediaMulti = []; // instantiate
            m.forEach((ml) => {
                this.mediaMulti.push({id: ml.media_type_id, name: ml.media});
            });
        });
        this._siglService.lakes.subscribe((l: Array<Ilake>) => {
            this.lakeMulti = []; // instantiate
            l.forEach((ll) => {
                this.lakeMulti.push({id: ll.lake_type_id, name: ll.lake});
            });
        });
        this._siglService.states.subscribe((s: Array<any>) => {
            this.stateMulti = []; // instantiate
            s.forEach((sl) => {
                this.stateMulti.push({id: sl, name: sl});
            });
        });
        this._siglService.monitorEfforts.subscribe((me: Array<ImonitorEffort>) => {
            this.monitorEffortMulti = []; // instantiate
            me.forEach((mel) => {
                this.monitorEffortMulti.push({id: mel.monitoring_coordination_id, name: mel.effort});
            });
        });
    }

    // toggle site tab / project tab
    public selectTab(tabname: string): void {
        if (this.selectedTabName === tabname) return;
        this.selectedTabName = tabname;
    }
    // clear the selected site filters
    public clearSiteFilters(): void {
        this.parameterSelected = [];
        this.parameterSelected = [];
        this.projDurationSelected = [];
        this.projStatusSelected = [];
        this.resourseSelected = [];
        this.mediaSelected = [];
        this.lakeSelected = [];
        this.stateSelected = [];
        this.monitorEffortSelected = [];
    }
    
    public multiChange(which: string, e: Array<any>): void {
        switch(which) {
            case "parameters":
                this.siteFilters.parameters = e;
                break;
            case "duration":
                this.siteFilters.projDuration = e;
                break;
            case "status":
                this.siteFilters.projStatus = e;
                break;
            case "resource":
                this.siteFilters.resources = e;
                break;
            case "media":
                this.siteFilters.media = e;
                break;
            case "lake":
                this.siteFilters.lakes = e;
                break;
            case "state":
                this.siteFilters.states = e;
                break;
            case "monitorEffort":
                this.siteFilters.monitorEffect = e;
                break;
        }
    }
    // get sites based on selected values
    public searchSites(): void {
        this._siglService.filteredSites = this.siteFilters;
        this._siglService.sites.subscribe((s: Array<Isite>) => {
            this.filteredSites = s;
        });
    }
}
