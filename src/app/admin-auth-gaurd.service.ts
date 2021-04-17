import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGaurdService implements CanActivate {

  constructor(private auth: AuthService, private userservice: UserService) {

  }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(
      map((appUser: any) => appUser.isAdmin)
    );
  }
}
