import { Component, Inject, OnInit } from '@angular/core';
import { NavMenuService } from '../../nav-menu/nav-menu.service';

@Component({
  selector: 'app-user',
  templateUrl: './application-user.component.html',
})

export class ApplicationUserComponent implements OnInit {

  constructor(public nav: NavMenuService) { }

  ngOnInit() {
    this.nav.hide();
  }
}
