import { Component, inject, input, InputSignal, OnChanges, OnInit, output, OutputEmitterRef, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { RouterLink } from "@angular/router";
import { NgClass } from '@angular/common';
import { CadastroDTO, EditarPerfilDTO, LoginDTO, UsuarioDTO } from '../../core/interfaces/usuario';
import { isMatchValidator } from '../../core/validators/isMatchValidator';

@Component({
  selector: 'app-form-auth',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterLink,
    NgClass
],
  templateUrl: './form-auth.component.html',
  styleUrl: './form-auth.component.scss'
})
export class FormAuthComponent implements OnInit, OnChanges {
  passwordRegex: string = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*\\-_])[A-Za-z\\d!@#$%^&*\\-_]{8,}$';
  phoneRegex: string = '^\\(?\\d{2}\\)?\\s?\\d{4,5}-?\\d{4}$';

  hidePassword: WritableSignal<boolean> = signal(true);
  hideConfirmPassword: WritableSignal<boolean> = signal(true);
  isLogin: InputSignal<boolean> = input(false);
  titulo: InputSignal<string> = input.required<string>();
  textoBotao: InputSignal<string> = input.required<string>();
  mensagemErro: InputSignal<string | undefined> = input<string>();
  usuario = input<UsuarioDTO>();

  loginSubmit: OutputEmitterRef<LoginDTO> = output<LoginDTO>();
  cadastroSubmit: OutputEmitterRef<CadastroDTO> = output<CadastroDTO>();
  editarSubmit: OutputEmitterRef<EditarPerfilDTO> = output<EditarPerfilDTO>();

  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly dateAdapter = inject(DateAdapter);

  form!: FormGroup;

  ngOnInit() {
    this.dateAdapter.setLocale('pt-BR');

    this.form = this.formBuilder.group({
      nome: [null, Validators.required],
      dataNascimento: [null, Validators.required],
      telefone: [null, [Validators.required, Validators.pattern(this.phoneRegex)]],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.pattern(this.passwordRegex)]],
      confirmarSenha: [null, Validators.required],
    });

    if (this.isLogin()) {
      this.form.get('nome')?.clearValidators();
      this.form.get('nome')?.updateValueAndValidity();

      this.form.get('dataNascimento')?.clearValidators();
      this.form.get('dataNascimento')?.updateValueAndValidity();

      this.form.get('telefone')?.clearValidators();
      this.form.get('telefone')?.updateValueAndValidity();

      this.form.get('senha')?.clearValidators();
      this.form.get('senha')?.updateValueAndValidity();

      this.form.get('confirmarSenha')?.clearValidators();
      this.form.get('confirmarSenha')?.updateValueAndValidity();
    }

    else if (!this.isLogin() && this.titulo() !== 'Editar perfil')
      this.form.setValidators(isMatchValidator('senha', 'confirmarSenha'));

    else {
      this.form.get('dataNascimento')?.clearValidators();
      this.form.get('dataNascimento')?.updateValueAndValidity();

      this.form.get('senha')?.clearValidators();
      this.form.get('senha')?.updateValueAndValidity();

      this.form.get('confirmarSenha')?.clearValidators();
      this.form.get('confirmarSenha')?.updateValueAndValidity();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['usuario'] && this.usuario()) {
      this.form.patchValue({
        nome: this.usuario()?.nome ?? null,
        dataNascimento: this.usuario()?.dataNascimento ?? null,
        telefone: this.usuario()?.telefone ?? null,
        email: this.usuario()?.email ?? null,
      });
    }
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

  changeVisibilityPassword() {
    this.hidePassword.set(!this.hidePassword());
  }

  changeVisibilityConfirmPassword() {
    this.hideConfirmPassword.set(!this.hideConfirmPassword());
  }

  onSubmit() {
    const email = this.form.get('email')?.value?.toLowerCase() ?? '';

    if (this.isLogin()) {
      const formValue: LoginDTO = {
        ...this.form.value,
        email
      };
      this.loginSubmit.emit(formValue);
      return;
    }

    else if (!this.isLogin() && this.titulo() !== 'Editar perfil') {
      const formValue: CadastroDTO = {
        ...this.form.value,
        email
      };
      this.cadastroSubmit.emit(formValue);
      return;
    }

    const formValue: EditarPerfilDTO = {
      ...this.form.value,
      email
    };
    this.editarSubmit.emit(formValue);
  }
}
