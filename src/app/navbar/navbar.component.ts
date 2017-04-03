import { Component } from "@angular/core";

@Component({
  selector: "navbar",
  styles: [
        require<any>("./navbar.component.less")
    ],
  template: require<any>("./navbar.component.html"),
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