import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  appuser: AppUser | undefined;

  constructor(public auth: AuthService) {
    this.auth.appUser$.subscribe((appuser: any) => this.appuser = appuser);
  }

  logout() {
    this.auth.logout();
  }
}
