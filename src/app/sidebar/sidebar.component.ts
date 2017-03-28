import {Component} from "@angular/core";
import { Observable } from "rxjs/Observable";
import {SiGLService} from "../../services/siglservices.service";
import {IsitesFilter} from "../interfaces/sitesFilter.interface";
import {Isite} from "../interfaces/site.interface";
import {Iproject} from "../interfaces/project.interface";
import {Ifullsite} from "../interfaces/fullsite.interface";
import {Ifullproject} from "../interfaces/fullproject.interface";
import {Iparameter} from "../interfaces/parameter.interface";
import {IprojDuration} from "../interfaces/projduration.interface";
import {IprojStatus} from "../interfaces/projstatus.interface";
import {Iresource} from "../interfaces/resource.interface";
import {Imedia} from "../interfaces/media.interface";
import {Ilake} from "../interfaces/lake.interface";
import {Istate} from "../interfaces/state.interface";
import {ImonitorEffort} from "../interfaces/monitoreffort.interface";
import {Iorganization} from "../interfaces/organization.interface";
import {Iobjective} from "../interfaces/objective.interface";
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
    public p_durationSelected: Array<number>; //holds ids of selected ( on project tab)
    public projStatusMulti: Array<IMultiSelectOption>; // dropdown multiselect contents
    public projStatusSelected: Array<number>; // holds ids of selected
    public p_statusSelected: Array<number>; //holds ids of selected (on project tab)
    public resourceMulti: Array<IMultiSelectOption>; // dropdown multiselect contents
    public resourseSelected: Array<number>; // holds ids of selected
    public mediaMulti: Array<IMultiSelectOption>; // dropdown multiselect contents
    public mediaSelected: Array<number>; // holds ids of selected
    public lakeMulti: Array<IMultiSelectOption>; // dropdown multiselect contents
    public lakeSelected: Array<number>; // holds ids of selected
    public p_lakeSelected: Array<number>; // holds ids of selected (on project tab)
    public stateMulti: Array<IMultiSelectOption>; // dropdown multiselect contents
    public stateSelected: Array<string>; // holds ids of selected
    public p_stateSelected: Array<string>; // holds ids of selected (on project tab)
    public monitorEffortMulti: Array<IMultiSelectOption>; // dropdown multiselect contents
    public monitorEffortSelected: Array<number>; // holds ids of selected
    public p_monitorEffortSelected: Array<number> //holds ids for selected (on project tab)
    public objectiveMulti: Array<IMultiSelectOption>; // dropdown multiselect contents
    public objectiveSelected: Array<number>; // holds ids of selected
    public siteTabFilters: IsitesFilter; // holds arrays of selected values to pass to services
    public projectTabFilters: IsitesFilter; // holds arrays of selected values to pass to services
    public multiSettings: IMultiSelectSettings; // setting to try and get optgroup as selectable (not working)
    public filteredSites: Array<Isite>; // sites returned from "Search"
    public projectList: Array<Iproject>;
    public projectFullSites: Array<Ifullsite>;
    public fullProject: Ifullproject;
    public selectedProject: Iproject;
    public organizationList: Array<Iorganization>; // dropdown multiselect contents
    public selectedOrg: Iorganization; // holds ids of selected

    constructor(private _siglService: SiGLService) {
        this.selectedTabName = "sites";
    }
    ngOnInit() {
        this.multiSettings = {selectionLimit: 0, autoUnselect: false};
        // instantiate
        this.siteTabFilters = { s_parameters: [], s_projDuration: [], s_projStatus: [], s_resources: [], s_media: [], s_lakes: [], s_states: [], s_monitorEffect: []};
        this.projectTabFilters = { p_organizations: 0, p_monitorEffect: [], p_objectives: [], p_projDuration: [], p_projStatus: [], p_lakes: [], p_states: [] };
        // populate dropdowns
        // parameters
        this._siglService.parameters.subscribe((p: Array<Iparameter>) => {
            this.parameterMulti = []; // instantiate
            this.parameterMulti.push({id: 1000, name: "Biological" });
            p.forEach((pl) => {
                if (pl.parameter_group === "Biological")
                    this.parameterMulti.push({id: pl.parameter_type_id, name: pl.parameter, parentId: 1000});
            });
            this.parameterMulti.push({id: 2000, name: "Chemical" });
            p.forEach((pl) => {
                if (pl.parameter_group === "Chemical")
                    this.parameterMulti.push({id: pl.parameter_type_id, name: pl.parameter, parentId: 2000});
            });
            this.parameterMulti.push({id: 3000, name: "Microbiological" });
            p.forEach((pl) => {
                if (pl.parameter_group === "Microbiological")
                    this.parameterMulti.push({id: pl.parameter_type_id, name: pl.parameter, parentId: 3000});
            });
            this.parameterMulti.push({id: 4000, name: "Physical" });
            p.forEach((pl) => {
                if (pl.parameter_group === "Physical")
                    this.parameterMulti.push({id: pl.parameter_type_id, name: pl.parameter, parentId: 4000});
            });
            this.parameterMulti.push({id: 5000, name: "Toxicological" });
             p.forEach((pl) => {
                if (pl.parameter_group === "Toxicological")
                    this.parameterMulti.push({id: pl.parameter_type_id, name: pl.parameter, parentId: 5000});
            });
        });
        // project duration
        this._siglService.projDurations.subscribe((pd: Array<IprojDuration>) => {
           this.projDurationMulti = []; // instantiate
           pd.forEach((pdl) => {
               this.projDurationMulti.push({ id: pdl.proj_duration_id, name: pdl.duration_value});
            });
        });
        // project status
        this._siglService.projStatuses.subscribe((ps: Array<IprojStatus>) => {
            this.projStatusMulti = []; // instantiate
            ps.forEach((psl) => {
                this.projStatusMulti.push({id: psl.proj_status_id, name: psl.status_value});
            });
        });
        // resources
        this._siglService.resources.subscribe((r: Array<Iresource>) => {
            this.resourceMulti = []; // instantiate
            r.forEach((rl) => {
                this.resourceMulti.push({id: rl.resource_type_id, name: rl.resource_name});
            });
        });
        // media
        this._siglService.media.subscribe((m: Array<Imedia>) => {
            this.mediaMulti = []; // instantiate
            m.forEach((ml) => {
                this.mediaMulti.push({id: ml.media_type_id, name: ml.media});
            });
        });
        // lakes
        this._siglService.lakes.subscribe((l: Array<Ilake>) => {
            this.lakeMulti = []; // instantiate
            l.forEach((ll) => {
                this.lakeMulti.push({id: ll.lake_type_id, name: ll.lake});
            });
        });
        // states
        this._siglService.states.subscribe((s: Array<any>) => {
            this.stateMulti = []; // instantiate
            s.forEach((sl) => {
                this.stateMulti.push({id: sl, name: sl});
            });
        });
        // monitorefforts
        this._siglService.monitorEfforts.subscribe((me: Array<ImonitorEffort>) => {
            this.monitorEffortMulti = []; // instantiate
            me.forEach((mel) => {
                this.monitorEffortMulti.push({id: mel.monitoring_coordination_id, name: mel.effort});
            });
        });
        // sites  ( this will update everytime Search is clicked )
        this._siglService.sites.subscribe((s: Array<Isite>) => {
            this.filteredSites = s; 
        });
        // projects
        this._siglService.projects.subscribe((proj: Array<Iproject>) => {
            this.projectList = proj;
        });
        // project full sites (updated when project search done)
        this._siglService.projectFullSites.subscribe((fullS: Array<Ifullsite>) => {
            this.projectFullSites = fullS; // this will update everytime Search is clicked on the Project tab
        });
        // full project (updated when project search done)
        this._siglService.fullProject.subscribe((fullP: Ifullproject) => {
            this.fullProject = fullP; // this will update everytime Search is clicked on the Project tab
        });
        // organizations
        this._siglService.organizations.subscribe((org: Array<Iorganization>) => {
                this.organizationList = org;
        });
        // objectives
        this._siglService.objectives.subscribe((obj: Array<Iobjective>) => {
            this.objectiveMulti = []; // instantiate
            obj.forEach((objl) => {
                this.objectiveMulti.push({id: objl.objective_type_id, name: objl.objective});
            });
        });
    }

    // toggle site tab / project tab
    public selectTab(tabname: string): void {
        if (this.selectedTabName === tabname) return;
        this.selectedTabName = tabname;
    }

    // SITE SECTION LOGIC ////////////////////////////////////
    // clear the selected site filters
    public clearSiteFilters(): void {
        this.parameterSelected = [];
        this.projDurationSelected = [];
        this.projStatusSelected = [];
        this.resourseSelected = [];
        this.mediaSelected = [];
        this.lakeSelected = [];
        this.stateSelected = [];
        this.monitorEffortSelected = [];
        this.siteTabFilters = { s_parameters: [], s_projDuration: [], s_projStatus: [], s_resources: [], s_media: [], s_lakes: [], s_states: [], s_monitorEffect: []};
    }    
    // every time a site filter option is chosen from the multiselects, update the siteFilters object with selected array
    public siteFilterChange(which: string, e: any): void {
        switch(which) {
            case "parameters":
                // dont add optgroup id (1000, 2000, 3000, 4000, 5000)
                this.siteTabFilters.s_parameters = [];
                e.forEach((eachParam) => {
                    if (eachParam !== 1000 && eachParam !== 2000 && eachParam !== 3000 && eachParam !== 4000 && eachParam !== 5000){
                        this.siteTabFilters.s_parameters.push(eachParam);
                    }
                });
                break;
            case "duration":
                this.siteTabFilters.s_projDuration = e;
                break;
            case "status":
                this.siteTabFilters.s_projStatus = e;
                break;
            case "resource":
                this.siteTabFilters.s_resources = e;
                break;
            case "media":
                this.siteTabFilters.s_media = e;
                break;
            case "lake":
                this.siteTabFilters.s_lakes = e;
                break;
            case "state":
                this.siteTabFilters.s_states = e;
                break;
            case "monitorEffort":
                this.siteTabFilters.s_monitorEffect = e;
                break;
        }
    }
    // get sites based on selected values
    public searchSites(): void {
        // make sure the project tab filters are cleared out before submitting since a few filters are duplicated and could cause confusion
        this.clearProjectFilters();
        this._siglService.filteredSites(this.siteTabFilters, "sites");
    }
    // END SITE SECTION LOGIC //////////////////////////////////

    // PROJECT SECTION LOGIC ////////////////////////////////////
    // project was selected, go get all the parts
    public onProjectSelect(e: Iproject){
        this._siglService.project = e;
    }
   
    public clearProjectFilters(){
        this.selectedOrg = undefined;
        this.p_monitorEffortSelected = [];
        this.objectiveSelected = [];
        this.p_durationSelected = [];
        this.p_statusSelected = [];
        this.p_lakeSelected = [];
        this.p_stateSelected = [];

        this.projectTabFilters = { p_organizations: 0, p_monitorEffect: [], p_objectives: [], p_projDuration: [], p_projStatus: [], p_lakes: [], p_states: [] };
    }
// every time a site filter option is chosen from the multiselects, update the siteFilters object with selected array
    public projectFilterChange(which: string, e: any): void {
        switch(which) {
            case "org":
                this.projectTabFilters.p_organizations = e.organization_id;
                break;
            case "monitorEffort":
                this.projectTabFilters.p_monitorEffect = e;
                break;
            case "objective":
                this.projectTabFilters.p_objectives = e;
                break;
            case "duration":
                this.projectTabFilters.p_projDuration = e;
                break;
            case "status":
                this.projectTabFilters.p_projStatus = e;
                break;            
            case "lake":
                this.projectTabFilters.p_lakes = e;
                break;
            case "state":
                this.projectTabFilters.p_states = e;
                break;
        }
    }
    public searchProjSites(){
        // make sure the site tab filters are cleared out before submitting since a few filters are duplicated and could cause confusion
        this.clearSiteFilters();
        this._siglService.filteredSites(this.projectTabFilters, "project");
    }

    // END PROJECT SECTION LOGIC //////////////////////////////////

}
