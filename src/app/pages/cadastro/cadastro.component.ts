import { Component, inject, signal } from '@angular/core';
import { FormAuthComponent } from "../../components/form-auth/form-auth.component";
import { CadastroDTO } from '../../core/interfaces/usuario';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [FormAuthComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  mensagemErro = signal<string>('');

  cadastrar(credenciais: CadastroDTO) {
    this.authService.cadastrar(credenciais).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },

      error: err => {
        this.mensagemErro.set(err.error.detail);
      }
    })
  }
}
