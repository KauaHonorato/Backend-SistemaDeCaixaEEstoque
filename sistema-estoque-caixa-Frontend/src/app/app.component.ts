// Autor: Pedro Sousa Assumpção <pedroheitor55@gmail.com>

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/auth/auth.service';
import { Usuario } from './core/models/usuario.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  get user(): Usuario | null {
    return this.auth.getCurrentUser();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
