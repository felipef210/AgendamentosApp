import { Component, inject, signal } from '@angular/core';
import { FormAuthComponent } from "../../components/form-auth/form-auth.component";
import { CadastroDTO } from '../../core/interfaces/usuario';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-cadastro',
  imports: [FormAuthComponent, MatProgressSpinnerModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);
  isLoading: boolean = false;

  mensagemErro = signal<string>('');

  cadastrar(credenciais: CadastroDTO) {
    this.isLoading = true;

    this.authService.cadastrar(credenciais).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/login'], { state: { mensagem: 'Cadastro realizado com sucesso!' } });
      },

      error: err => {
        this.isLoading = false;
        this.mensagemErro.set(err.error.detail);
      }
    })
  }
}
