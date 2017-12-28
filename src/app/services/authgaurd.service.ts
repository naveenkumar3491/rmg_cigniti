import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Ng2Storage } from './storage';
import { ILoginResponse } from '../app.interface';

@Injectable()
export class AuthgaurdService implements CanActivate {
  private adminRoles: string[] = ['rmg'];
  constructor(private router: Router, private storage: Ng2Storage) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url = route.routeConfig.path;
    return this.checkLogin(url);
  }

  checkLogin(url) {
    const userData: ILoginResponse = this.storage.getSession('user_data');
    if (!userData) {
      this.router.navigate(['/login']);
      return false;
    }
    const userRole = userData.employeeRoleName.toLowerCase();
    if (this.adminRoles.indexOf(userRole) !== -1 && url === 'rmg') {
      return true;
    }else if (this.adminRoles.indexOf(userRole) !== -1 && url === 'employee') {
      return false;
    }else if (this.adminRoles.indexOf(userRole) === -1 && url === 'rmg') {
      return false;
    }else if (this.adminRoles.indexOf(userRole) === -1 && url === 'employee') {
      return true;
    }
  }
}
