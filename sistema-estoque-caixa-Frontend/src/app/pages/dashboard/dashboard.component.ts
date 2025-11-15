// Autor: Pedro Sousa Assumpção <pedroheitor55@gmail.com>

import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Usuario } from '../../core/models/usuario.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(public auth: AuthService) {}

  get user(): Usuario | null {
    return this.auth.getCurrentUser();
  }
}
