import {Component, ViewChild} from "@angular/core";
import {IsitesFilter} from "../interfaces/sitesFilter.interface";
import {SiGLService} from "../../services/siglservices.service";

@Component({
    selector: "filterside",
    template: require<any>("./filterside.component.html"),
    styles: [
        require<any>("./filterside.component.less")
    ]
})
export class FiltersideComponent {    
    public siteTabFilters: IsitesFilter; // holds arrays of selected values to pass to services
    constructor(private _siglService: SiGLService) { }

    ngOnInit() {
    //show the chosen filters in sidebar
        this._siglService.chosenFilters.subscribe((f: IsitesFilter) => {
          this.siteTabFilters = f;
        }); 
    }
    
    //they clicked "Filter" button
    public showChildModal(){
        //pass the filters already chosen along too
        this._siglService.showModal = true;
    }
}
