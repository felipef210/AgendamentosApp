import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { isMatchValidator } from '../../core/validators/isMatchValidator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ResetarSenhaDTO } from '../../core/interfaces/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-resetar-senha',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, RouterLink],
  templateUrl: './resetar-senha.component.html',
  styleUrl: './resetar-senha.component.scss'
})
export class ResetarSenhaComponent implements OnInit {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly router: Router = inject(Router);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly snackBar: MatSnackBar = inject(MatSnackBar);
  private readonly authService: AuthService = inject(AuthService);

  passwordRegex: string = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*\\-_])[A-Za-z\\d!@#$%^&*\\-_]{8,}$';
  hidePassword: WritableSignal<boolean> = signal(true);
  hideConfirmPassword: WritableSignal<boolean> = signal(true);
  email!: string;
  token!: string;

  form!: FormGroup;

  ngOnInit() {
    this.form = this.formBuilder.group({
      senha: [null, [Validators.required, Validators.pattern(this.passwordRegex)]],
      confirmarSenha: [null, [Validators.required]],
    }, { validators: isMatchValidator('senha', 'confirmarSenha') });

    this.activatedRoute.queryParams.subscribe(params => {
      this.email = params['email'];
      this.token = params['token'];
    });
  }

  changeVisibilityPassword() {
    this.hidePassword.set(!this.hidePassword());
  }

  changeVisibilityConfirmPassword() {
    this.hideConfirmPassword.set(!this.hideConfirmPassword());
  }

  getErroConfirmarSenha(): string | null {
    const control = this.form.get('confirmarSenha');
    if (!control) return null;

    if (control.hasError('required'))
      return 'A confirmação de senha é obrigatória';

    if (control.hasError('mustMatch') && (control.touched || control.dirty))
      return 'As senhas devem coincidir';

    return null;
  }

  onSubmit() {
    if (this.form.valid) {
      const dto: ResetarSenhaDTO = {
        email: this.email,
        token: this.token,
        novaSenha: this.form.get('senha')?.value,
        confirmarSenha: this.form.get('confirmarSenha')?.value
      };

      this.authService.resetarSenha(dto).subscribe({
        next: () => {
          this.snackBar.open('Senha resetada com sucesso! Redirecionando para o login...', '', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snack-success']
          });
          setTimeout(() => this.router.navigate(['/login']), 4000);
        },

        error: () => {
          this.snackBar.open('Erro ao resetar a senha. Tente novamente.', '', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snack-error']
          });
          setTimeout(() => window.location.reload(), 4000);
        }
      });
    }
  }
}
