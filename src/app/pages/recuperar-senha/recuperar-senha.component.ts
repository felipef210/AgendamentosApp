import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from "@angular/router";
import { EsqueceuSenhaDTO } from '../../core/interfaces/usuario';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-recuperar-senha',
  imports: [MatFormFieldModule, MatIconModule, ReactiveFormsModule, MatInputModule, MatButtonModule, RouterLink, MatProgressSpinnerModule],
  templateUrl: './recuperar-senha.component.html',
  styleUrl: './recuperar-senha.component.scss'
})
export class RecuperarSenhaComponent implements OnInit {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly snackBar: MatSnackBar = inject(MatSnackBar);
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  form!: FormGroup;
  isLoading: boolean = false;

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;
      const dto: EsqueceuSenhaDTO = this.form.getRawValue();

      this.authService.enviarEmailRecuperacaoSenha(dto).subscribe({
        next: () => {
          this.snackBar.open('E-mail de recuperação de senha enviado com sucesso!', '', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snack-success']
          });

          this.isLoading = false;

          setTimeout(() => this.router.navigate(['/login']), 4000);
        },

        error: () => {
          this.snackBar.open('Erro ao enviar e-mail de recuperação de senha. Tente novamente.', '', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snack-error']
          });

          this.isLoading = false;

          setTimeout(() => window.location.reload(), 4000);

        }
      });
    }
  }
}
