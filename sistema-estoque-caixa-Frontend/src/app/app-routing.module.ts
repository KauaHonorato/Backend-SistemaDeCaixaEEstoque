// Autor: Pedro Sousa Assumpção <pedroheitor55@gmail.com>

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { MovimentacoesComponent } from './pages/movimentacoes/movimentacoes.component';
import { CaixaComponent } from './pages/caixa/caixa.component';
import { VendasComponent } from './pages/vendas/vendas.component';
import { AuthGuard } from './core/auth/auth.guard';
import { RoleGuard } from './core/auth/role.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'produtos',
    component: ProdutosComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'movimentacoes',
    component: MovimentacoesComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'caixa',
    component: CaixaComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['OPERADOR'] }
  },
  {
    path: 'vendas',
    component: VendasComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN', 'OPERADOR'] }
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
