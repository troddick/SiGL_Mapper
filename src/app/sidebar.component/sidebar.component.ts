import {Component } from "@angular/core";
import {FiltersideComponent} from "../filter.component/filterside.component";
import {BasemapsComponent} from "../basemaps.component/basemaps.component";

@Component({
    selector: "sidebar",
    template: `
        <div class="sidebar sidebar-left" id="sidebar">
            <accordion>
                <accordion-group #group1>
                    <div accordion-heading>Basemaps
                        <i class="pull-right float-xs-right glyphicon" [ngClass]="{'glyphicon-chevron-down': group1?.isOpen, 'glyphicon-chevron-right': !group1?.isOpen}"></i>
                    </div>
                    <basemaps></basemaps>                             
                </accordion-group>
                <accordion-group #group2>
                    <div accordion-heading>Filters
                        <i class="pull-right float-xs-right glyphicon" [ngClass]="{'glyphicon-chevron-down': group2?.isOpen, 'glyphicon-chevron-right': !group2?.isOpen}"></i>
                    </div>
                    <filterside></filterside>                    
                </accordion-group>
            </accordion>
        </div>
    `,
    styles: [
        require<any>("./sidebar.component.less"),
        require<any>("../../styles/main.less")
    ]
})
export class SidebarComponent { 
    public baseLayers: any;
    public chosenBaselayer: any;
    constructor(){}
    
    ngOnInit() { 
    }
}
