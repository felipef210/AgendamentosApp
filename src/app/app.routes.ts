import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { AgendamentosComponent } from './pages/agendamentos/agendamentos.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';
import { authRedirectGuard } from './core/guards/auth-redirect.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [authRedirectGuard] },
  { path: 'cadastro', component: CadastroComponent, canActivate: [authRedirectGuard] },
  { path: 'agendamentos', component: AgendamentosComponent, canActivate: [authGuard] },
  { path: 'perfil', component: EditarPerfilComponent, canActivate: [authGuard] },
  { path: '**', component: HomeComponent }
];
