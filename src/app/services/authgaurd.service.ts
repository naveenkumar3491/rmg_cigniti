import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';

@Injectable()
export class AuthgaurdService implements CanActivate {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
     const url= route.routeConfig.path;
    
    return this.checkLogin(url);
    }
checkLogin(url){
   const session=true;
  if(url=='rmgEmployee' && session){
    return true
  }
  else if(url=='rmgEmployee' && !session){
    this.router.navigate(['/login']);
    return false;
  }
  else if(url=='employee' && session){
    return true
  }

}

  constructor(private router:Router) { }

}
