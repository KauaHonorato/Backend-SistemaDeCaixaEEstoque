// Autor: Pedro Sousa Assumpção <pedroheitor55@gmail.com>

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from './auth.service';
import { PerfilUsuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const roles = route.data['roles'] as PerfilUsuario[] | undefined;
    const user = this.auth.getCurrentUser();

    if (!user) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }

    if (roles && !roles.includes(user.perfil)) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
