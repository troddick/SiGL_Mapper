import {Component, ViewChild} from "@angular/core";
import {ModalDirective } from 'ng2-bootstrap/modal';
import {MapService} from "../../services/map.service";
import {SiGLService} from "../../services/siglservices.service";
import {IMultiSelectOption, IMultiSelectSettings  } from "angular-2-dropdown-multiselect";
import {Iparameter} from "../../core/parameter.interface";
import {IprojDuration} from "../../core/projduration.interface";
import {IprojStatus} from "../../core/projstatus.interface";
import {Iresource} from "../../core/resource.interface";
import {Imedia} from "../../core/media.interface";
import {Ilake} from "../../core/lake.interface";
import {Istate} from "../../core/state.interface";
import {ImonitorEffort} from "../../core/monitoreffort.interface";
import {Iorganization} from "../../core/organization.interface";
import {Iobjective} from "../../core/objective.interface";
import {IsitesFilter} from "../../core/sitesFilter.interface";
import {Isite} from "../../core/site.interface";
import {Iproject} from "../../core/project.interface";
import {Ifullsite} from "../../core/fullsite.interface";
import {Ifullproject} from "../../core/fullproject.interface";

@Component({
    selector: "filtermodal",
    template: require<any>("./filtermodal.component.html"),
    styles: [
        require<any>("./filtermodal.component.less")
    ]
})
export class FiltermodalComponent {
    @ViewChild('childModal') public childModal:ModalDirective; 
    public parameterMulti: Array<IMultiSelectOption> = []; // dropdown multiselect contents
    public parameterSelected: Array<number>; // holds ids of selected
    public projDurationMulti: Array<IMultiSelectOption> = [];;  // dropdown multiselect contents
    public projDurationSelected: Array<number>; // holds ids of selected
    public p_durationSelected: Array<number>; //holds ids of selected ( on project tab)
    public projStatusMulti: Array<IMultiSelectOption> = [];; // dropdown multiselect contents
    public projStatusSelected: Array<number>; // holds ids of selected
    public p_statusSelected: Array<number>; //holds ids of selected (on project tab)
    public resourceMulti: Array<IMultiSelectOption> = [];; // dropdown multiselect contents
    public resourseSelected: Array<number>; // holds ids of selected
    public mediaMulti: Array<IMultiSelectOption> = [];; // dropdown multiselect contents
    public mediaSelected: Array<number>; // holds ids of selected
    public lakeMulti: Array<IMultiSelectOption> = [];; // dropdown multiselect contents
    public lakeSelected: Array<number>; // holds ids of selected
    public p_lakeSelected: Array<number>; // holds ids of selected (on project tab)
    public stateMulti: Array<IMultiSelectOption> = [];; // dropdown multiselect contents
    public stateSelected: Array<string>; // holds ids of selected
    public p_stateSelected: Array<string>; // holds ids of selected (on project tab)
    public monitorEffortMulti: Array<IMultiSelectOption> = [];; // dropdown multiselect contents
    public monitorEffortSelected: Array<number>; // holds ids of selected
    public p_monitorEffortSelected: Array<number> //holds ids for selected (on project tab)
    public objectiveMulti: Array<IMultiSelectOption> = [];; // dropdown multiselect contents
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
    
    constructor(private _mapService: MapService, private _siglService: SiGLService) { }

    ngOnInit() {
        this.siteTabFilters = {p_organizations: 0,p_objectives: [], s_parameters: [], s_projDuration: [], s_projStatus: [], s_resources: [], s_media: [], s_lakes: [], s_states: [], s_monitorEffect: []};
        // dropdowns
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
        this._siglService.projects.subscribe((proj: Array<Iproject>) => {
            this.projectList = proj;
        });        
        this._siglService.organizations.subscribe((org: Array<Iorganization>) => {
                this.organizationList = org;
        });
        this._siglService.objectives.subscribe((obj: Array<Iobjective>) => {
            this.objectiveMulti = []; // instantiate
            obj.forEach((objl) => {
                this.objectiveMulti.push({id: objl.objective_type_id, name: objl.objective});
            });
        });        
        //show the filter modal == Change Filters button was clicked in sidebar
        this._siglService.showModal.subscribe((show: boolean) => {
            if (show) this.showChildModal();            
        });                
    } // end ngOnInit()

    // every time a site filter option is chosen from the multiselects, update the siteFilters object with selected array
    public siteFilterChange(which: string, e: any): void {
        switch(which) {
            case "parameters":
                // dont add optgroup id (1000, 2000, 3000, 4000, 5000)
                this.siteTabFilters.s_parameters = []; this.siteTabFilters.PARAMETERS = [];
                e.forEach((eachParam) => {
                    if (eachParam !== 1000 && eachParam !== 2000 && eachParam !== 3000 && eachParam !== 4000 && eachParam !== 5000){
                        this.siteTabFilters.s_parameters.push(eachParam);
                        //update sidebar's filter choices here too
                        this.siteTabFilters.PARAMETERS.push(this.parameterMulti.filter(function(p){return p.id == eachParam;})[0]);                        
                    }
                });
                break;
            case "duration":
                this.siteTabFilters.s_projDuration = e;
                this.siteTabFilters.DURATIONS = [];
                e.forEach((eachParam) => {
                    this.siteTabFilters.DURATIONS.push(this.projDurationMulti.filter(function(d){return d.id == eachParam;})[0]);
                });
                break;
            case "status":
                this.siteTabFilters.s_projStatus = e;
                this.siteTabFilters.STATUSES = [];
                e.forEach((eachParam) => {
                    this.siteTabFilters.STATUSES.push(this.projStatusMulti.filter(function(s){return s.id == eachParam;})[0]);
                });
                break;
            case "resource":
                this.siteTabFilters.s_resources = e;                
                this.siteTabFilters.RESOURCES = [];
                e.forEach((eachParam) => {
                    this.siteTabFilters.RESOURCES.push(this.resourceMulti.filter(function(r){return r.id == eachParam;})[0]);
                });
                break;
            case "media":
                this.siteTabFilters.s_media = e;
                this.siteTabFilters.MEDIA = [];
                e.forEach((eachParam) => {
                    this.siteTabFilters.MEDIA.push(this.mediaMulti.filter(function(s){return s.id == eachParam;})[0]);
                });
                break;
            case "lake":
                this.siteTabFilters.s_lakes = e;
                this.siteTabFilters.LAKES = [];
                e.forEach((eachParam) => {
                    this.siteTabFilters.LAKES.push(this.lakeMulti.filter(function(l){return l.id == eachParam;})[0]);
                });
                break;
            case "state":
                this.siteTabFilters.s_states = e;
                this.siteTabFilters.STATES = [];
                e.forEach((eachParam) => {
                    this.siteTabFilters.STATES.push(this.stateMulti.filter(function(st){return st.id == eachParam;})[0]);
                });
                break;
            case "monitorEffort":
                this.siteTabFilters.s_monitorEffect = e;
                this.siteTabFilters.MONITORS = [];
                e.forEach((eachParam) => {
                    this.siteTabFilters.MONITORS.push(this.monitorEffortMulti.filter(function(mc){return mc.id == eachParam;})[0]);
                });
                break;
            case "org":
                this.siteTabFilters.p_organizations = e.organization_id;
                this.siteTabFilters.ORG = e;
                break;           
            case "objective":
                this.siteTabFilters.p_objectives = e;
                this.siteTabFilters.OBJS = [];
                e.forEach((eachParam) => {
                    this.siteTabFilters.OBJS.push(this.objectiveMulti.filter(function(ot){return ot.id == eachParam;})[0]);
                });
                break;
        }
        this._siglService.chosenFilters = this.siteTabFilters; //setter
    }
     // clear the selected site filters
    public clearFilters(): void {
        this.parameterSelected = [];
        this.projDurationSelected = [];
        this.projStatusSelected = [];
        this.resourseSelected = [];
        this.mediaSelected = [];
        this.lakeSelected = [];
        this.stateSelected = [];
        this.monitorEffortSelected = [];
        this.selectedOrg = undefined;       
        this.objectiveSelected = [];
        this.siteTabFilters = { p_organizations: 0,p_objectives: [], s_parameters: [], s_projDuration: [], s_projStatus: [], s_resources: [], s_media: [], s_lakes: [], s_states: [], s_monitorEffect: []};
        this._siglService.chosenFilters = this.siteTabFilters; //setter
    }    
    //show the modal
    public showChildModal():void {
        this._mapService.map.dragging.disable();
        this._mapService.map.touchZoom.disable();
        this._mapService.map.doubleClickZoom.disable();
        this._mapService.map.scrollWheelZoom.disable();
        this._mapService.map.boxZoom.disable();
        this._mapService.map.keyboard.disable();
        if (this._mapService.map.tap) this._mapService.map.tap.disable();
        //document.getElementById('map').style.cursor='default';
        this.childModal.show();//pass in chosen filters
    }
    //hide the modal
    public hideChildModal():void {
        this._siglService.showModal = false;
        this._mapService.map.dragging.enable();
        this._mapService.map.touchZoom.enable();
        this._mapService.map.doubleClickZoom.enable();
        this._mapService.map.scrollWheelZoom.enable();
        this._mapService.map.boxZoom.enable();
        this._mapService.map.keyboard.enable();
        if (this._mapService.map.tap) this._mapService.map.tap.enable();
        this.childModal.hide();
    }
    // project was selected, go get all the parts
    public onProjectSelect(e: Iproject){
        this._siglService.project = e;
    }
    // search for sites with these filters
    public searchSites(): void {
        this._siglService.filteredSites(this.siteTabFilters);
        this.hideChildModal();
    }
}
