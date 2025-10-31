import { Component, inject, signal } from '@angular/core';
import { FormAuthComponent } from "../../components/form-auth/form-auth.component";
import { LoginDTO } from '../../core/interfaces/usuario';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormAuthComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login = signal(true);
  mensagemErro = '';

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  logar(usuario: LoginDTO) {


    this.authService.login(usuario).subscribe({
      next: () => {
        this.router.navigate(['/agendamentos']);
      },

      error: () => {
        this.mensagemErro = 'E-mail ou senha inválido';
      }
    })
  }
}
