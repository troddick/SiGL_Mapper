import {Component, ViewChild} from "@angular/core";
import { ModalDirective } from 'ng2-bootstrap/modal';
import {MapService} from "../../services/map.service";
import {SiGLService} from "../../services/siglservices.service";
import {GeocodingService} from "../../services/geocoding.service";
import {Location} from "../../core/location.class";
import { IMultiSelectOption, IMultiSelectSettings  } from "angular-2-dropdown-multiselect";
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
import {IsitesFilter} from "../interfaces/sitesFilter.interface";
import {Isite} from "../interfaces/site.interface";
import {Iproject} from "../interfaces/project.interface";
import {Ifullsite} from "../interfaces/fullsite.interface";
import {Ifullproject} from "../interfaces/fullproject.interface";
@Component({
    selector: "mainview",
    template: require<any>("./mainview.component.html"),
    styles: [
        require<any>("./mainview.component.less")
    ]
})
export class MainviewComponent {
  //  @ViewChild(ToolbarComponent) toolbarComponent: ToolbarComponent;
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
    constructor(private mapService: MapService, private _siglService: SiGLService, private geocoder: GeocodingService) {
    }

    ngOnInit() {
        this.siteTabFilters = {p_organizations: 0,p_objectives: [], s_parameters: [], s_projDuration: [], s_projStatus: [], s_resources: [], s_media: [], s_lakes: [], s_states: [], s_monitorEffect: []};
        //this.projectTabFilters = { p_organizations: 0, p_monitorEffect: [], p_objectives: [], p_projDuration: [], p_projStatus: [], p_lakes: [], p_states: [] };
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
        // projects
        this._siglService.projects.subscribe((proj: Array<Iproject>) => {
            this.projectList = proj;
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


        //show the filter modal
        this._siglService.showModal.subscribe((show: boolean) => {
            if (show) this.showChildModal();            
        });

        let map = L.map("map", {
           // zoomControl: false, //allows to override placement of controls
            center: L.latLng(40.731253, -73.996139),
            zoom: 12,
            minZoom: 4,
            maxZoom: 19,
            layers: [this.mapService.baseMaps.OpenStreetMap]
        });

       // L.control.zoom({ position: "topright" }).addTo(map); //add it back here to put it where you want
        L.control.layers(null, this.mapService.baseMaps, {position: "topleft"}).addTo(map);
        L.control.scale().addTo(map);

        this.mapService.map = map;
        this.geocoder.getCurrentLocation()
            .subscribe(
                location => map.panTo([location.latitude, location.longitude]),
                err => console.error(err)
            );
     //   this.toolbarComponent.Initialize();
    } // end ngOnInit()

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
            case "org":
                this.siteTabFilters.p_organizations = e.organization_id;
                break;           
            case "objective":
                this.siteTabFilters.p_objectives = e;
                break;
        }
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
    }    
    //show the modal
    public showChildModal():void {
        this.childModal.show();
    }

    //hide the modal
    public hideChildModal():void {
        this._siglService.showModal = false;
        this.childModal.hide();
    }

    // project was selected, go get all the parts
    public onProjectSelect(e: Iproject){
        this._siglService.project = e;
    }
    // search for sites with these filters
    public searchSites(): void {
        this._siglService.filteredSites(this.siteTabFilters, "sites");
    }
}
