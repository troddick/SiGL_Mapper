import {Component} from "@angular/core";
import {SiGLService} from "../../services/siglservices.service";
import {IsitesFilter} from "../interfaces/sitesFilter.interface";
import {Iparameter} from "../interfaces/sitesFilter.interface";
import {IprojDuration} from "../interfaces/sitesFilter.interface";
import {IprojStatus} from "../interfaces/sitesFilter.interface";
import {Iresource} from "../interfaces/sitesFilter.interface";
import {Imedia} from "../interfaces/sitesFilter.interface";
import {Ilake} from "../interfaces/sitesFilter.interface";
import {Istate} from "../interfaces/sitesFilter.interface";
import {ImonitorEffort} from "../interfaces/sitesFilter.interface";

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
    public parameterList: Array<Iparameter>;
    public projDurationList: Array<IprojDuration>;
    public projStatusList: Array<IprojStatus>;
    public resourceList: Array<Iresource>;
    public mediaList: Array<Imedia>;
    public lakeList: Array<Ilake>;
    public stateList: Array<Istate>;
    public monitorEffortList: Array<ImonitorEffort>;

    public siteFilters: IsitesFilter;

    constructor(private _siglService: SiGLService) {
        this.selectedTabName = "sites";
    }
    ngOnInit(){
        this._siglService.parameters.subscribe((p: Array<Iparameter>) => {this.parameterList = p;});
        this._siglService.projDurations.subscribe((pd: Array<IprojDuration>) => { this.projDurationList = pd;});
    }

    public selectTab(tabname: string): void {
        if (this.selectedTabName === tabname) return;
        this.selectedTabName = tabname;
    }
}
