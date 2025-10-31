import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FormAuthComponent } from "../../components/form-auth/form-auth.component";
import { AuthService } from '../../core/services/auth.service';
import { EditarPerfilDTO, UsuarioDTO } from '../../core/interfaces/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-perfil',
  imports: [HeaderComponent, FormAuthComponent],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.scss'
})
export class EditarPerfilComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  mensagemErro!: string;
  usuario!: UsuarioDTO;

  ngOnInit() {
    this.authService.getUsuarioPorId().subscribe((usuario) => this.usuario = usuario);
  }

  editarPerfil(credenciais: EditarPerfilDTO) {
    this.authService.editarPerfil(credenciais).subscribe({
      next: () => {
        this.router.navigate(['/agendamentos']);
      },

      error: err => {
        this.mensagemErro = 'Verifique os campos do seu formulário';
      }
    })
  }
}
