import { Component } from "@angular/core";

@Component({
  selector: "navbar",
  styles: [
        require<any>("./navbar.component.less")
    ],
  template: `
    <nav id="header" class="navbar nav-default navbar-fixed-top" role="navigation">
      <div id="usgsLogoDiv" class="navbar-header">
        <img id="usgsLogo" alt="USGS Logo" src="assets/usgsLogo.png" /><!--</a>-->
      </div>
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <div id="title">{{title}}</div>
        <div id="titleSeparator">:</div>
        <div id="subTitle">{{subTitle}}</div>
      </div>
    </nav>`// require<any>("./navbar.component.html"),
})
export class NavbarComponent {
  public title: string;
  public subTitle: string;
  constructor() {}

  ngOnInit() {
    this.title = "SiGL";
    this.subTitle = "Science in the Great Lakes";
  }  
}