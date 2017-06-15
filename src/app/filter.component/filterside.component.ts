import {Component, ViewChild} from "@angular/core";
import {IsitesFilter} from "../../core/sitesFilter.interface";
import {SiGLService} from "../../services/siglservices.service";

@Component({
    selector: "filterside",
    template: require<any>("./filterside.component.html"),
    styles: ["./filterside.component.less"]
})
export class FiltersideComponent {
    public siteTabFilters: IsitesFilter; // holds arrays of selected values to pass to services
    constructor(private _siglService: SiGLService) { }

    ngOnInit() {
        //show the chosen filters in sidebar (when selected/unselected from filtermodal)
        this._siglService.chosenFilters.subscribe((f: IsitesFilter) => {
          this.siteTabFilters = f;
        });
    }
    
    //they clicked "Filter" button (go tell services to let the map.module's mainview to show the filtermodal)
    public showChildModal(){
        this._siglService.showModal = true;
    }
}
