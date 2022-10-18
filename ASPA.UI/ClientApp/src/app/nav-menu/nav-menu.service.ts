import { Injectable } from '@angular/core';

@Injectable()

export class NavMenuService {
  visible: boolean;
  isExpanded = true;

  constructor() {
    this.visible = false;
    this.visible = true;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  collapse() {
    this.isExpanded = false;
  }

  hide() {
    this.visible = false;
  }

  show() {
    this.visible = true;
  }

  redirect_to_login(){

  }
}
