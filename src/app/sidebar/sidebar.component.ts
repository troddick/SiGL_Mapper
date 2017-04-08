import {Component } from "@angular/core";
import { ModalDirective } from 'ng2-bootstrap/modal';
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
        require<any>("../../styles/main.less")//,
        //require<any>("../../node_modules/bootstrap/dist/css/bootstrap.min.css")
    ]
})
export class SidebarComponent { 
    public selectedTabName: string;
    //public parameterMulti: Array<IMultiSelectOption> = []; // dropdown multiselect contents
    public parameterSelected: Array<number>; // holds ids of selected
    //public projDurationMulti: Array<IMultiSelectOption> = [];;  // dropdown multiselect contents
    public projDurationSelected: Array<number>; // holds ids of selected
    public p_durationSelected: Array<number>; //holds ids of selected ( on project tab)
    //public projStatusMulti: Array<IMultiSelectOption> = [];; // dropdown multiselect contents
    public projStatusSelected: Array<number>; // holds ids of selected
    public p_statusSelected: Array<number>; //holds ids of selected (on project tab)
    //public resourceMulti: Array<IMultiSelectOption> = [];; // dropdown multiselect contents
    public resourseSelected: Array<number>; // holds ids of selected
    //public mediaMulti: Array<IMultiSelectOption> = [];; // dropdown multiselect contents
    public mediaSelected: Array<number>; // holds ids of selected
   // public lakeMulti: Array<IMultiSelectOption> = [];; // dropdown multiselect contents
    public lakeSelected: Array<number>; // holds ids of selected
    public p_lakeSelected: Array<number>; // holds ids of selected (on project tab)
    //public stateMulti: Array<IMultiSelectOption> = [];; // dropdown multiselect contents
    public stateSelected: Array<string>; // holds ids of selected
    public p_stateSelected: Array<string>; // holds ids of selected (on project tab)
   // public monitorEffortMulti: Array<IMultiSelectOption> = [];; // dropdown multiselect contents
    public monitorEffortSelected: Array<number>; // holds ids of selected
    public p_monitorEffortSelected: Array<number> //holds ids for selected (on project tab)
   // public objectiveMulti: Array<IMultiSelectOption> = [];; // dropdown multiselect contents
    public objectiveSelected: Array<number>; // holds ids of selected
    public siteTabFilters: IsitesFilter; // holds arrays of selected values to pass to services
   // public projectTabFilters: IsitesFilter; // holds arrays of selected values to pass to services
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
       // this.siteTabFilters = { s_parameters: [], s_projDuration: [], s_projStatus: [], s_resources: [], s_media: [], s_lakes: [], s_states: [], s_monitorEffect: []};
     //   this.projectTabFilters = { p_organizations: 0, p_monitorEffect: [], p_objectives: [], p_projDuration: [], p_projStatus: [], p_lakes: [], p_states: [] };
        // populate dropdowns
        
        // sites  ( this will update everytime Search is clicked )
        this._siglService.sites.subscribe((s: Array<Isite>) => {
            this.filteredSites = s; 
        });        
        // project full sites (updated when project search done)
        this._siglService.projectFullSites.subscribe((fullS: Array<Ifullsite>) => {
            this.projectFullSites = fullS; // this will update everytime Search is clicked on the Project tab
        });
        // full project (updated when project search done)
        this._siglService.fullProject.subscribe((fullP: Ifullproject) => {
            this.fullProject = fullP; // this will update everytime Search is clicked on the Project tab
        });       
        //show the chosen filters in sidebar
        this._siglService.chosenFilters.subscribe((f: IsitesFilter) => {
          this.siteTabFilters = f;  
        }); // same as subscribe?
    }
    
    public showChildModal(){
        //pass the filters already chosen along too
        this._siglService.showModal = true;
    }
}
