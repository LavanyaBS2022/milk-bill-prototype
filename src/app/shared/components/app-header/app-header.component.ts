import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./app-header.component.html",
  styleUrls: ["./app-header.component.scss"]
})
export class AppHeaderComponent implements OnInit {
  headerTitle: string = "Dashboard";

  constructor(
    public dialog: MatDialog,
    private router: Router
  ) {

  }

  ngOnInit() {
  }

  logout() {
    window.localStorage.removeItem('mean-token');
    this.router.navigate(["login"]);
  }
}
