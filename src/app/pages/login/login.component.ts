import { Component, inject, signal } from '@angular/core';
import { FormAuthComponent } from "../../components/form-auth/form-auth.component";
import { LoginDTO } from '../../core/interfaces/usuario';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [FormAuthComponent, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login = signal(true);
  mensagemErro = '';
  isLoading: boolean = false;

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly snackBar: MatSnackBar = inject(MatSnackBar);

  constructor() {
    const state = history.state;
    const mensagem = state?.mensagem;

    if (mensagem) {
      this.snackBar.open(mensagem, '', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });

      window.history.replaceState({}, '', this.router.url);
    }
  }

  logar(usuario: LoginDTO) {
    this.isLoading = true;

    this.authService.login(usuario).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/agendamentos']);
      },

      error: () => {
        this.isLoading = false;
        this.mensagemErro = 'E-mail ou senha inválido';
      }
    })
  }
}
