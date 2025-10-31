import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';
import { AgendamentoDTO } from '../../core/interfaces/agendamento';
import { CardAgendamentoComponent } from "../../components/card-agendamento/card-agendamento.component";
import { AgendamentoService } from '../../core/services/agendamento.service';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { HeaderComponent } from "../../components/header/header.component";
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-agendamentos',
  imports: [MatButtonModule, MatIconModule, CardAgendamentoComponent, MatDialogModule, HeaderComponent, AsyncPipe],
  templateUrl: './agendamentos.component.html',
  styleUrl: './agendamentos.component.scss'
})
export class AgendamentosComponent implements OnInit {
  public readonly dialog = inject(MatDialog);
  public readonly authService: AuthService = inject(AuthService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly agendamentoService: AgendamentoService = inject(AgendamentoService);

  private agendamentosSubject = new BehaviorSubject<AgendamentoDTO[]>([]);
  agendamento$ = this.agendamentosSubject.asObservable();

  ngOnInit() {
    this.carregarAgendamentos();
  }

  carregarAgendamentos() {
    if (this.authService.getRole() === 'admin') {
      this.agendamento$ = this.agendamentoService.getAgendamentosAdmin();
      return;
    }

    this.agendamento$ = this.agendamentoService.getAgendamentosCliente();
  }

  editarAgendamento() {
    this.carregarAgendamentos();
    this.snackBar.open('Agendamento editado com sucesso!', '', {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'end'
    });
  }

  deletarAgendamento() {
    this.carregarAgendamentos();
    this.snackBar.open('Agendamento cancelado com sucesso!', '', {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'end'
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
    })

    dialogRef.afterClosed().subscribe((atualizar?: boolean) => {
      if (atualizar) {
        this.carregarAgendamentos();
        this.snackBar.open('Agendamento realizado com sucesso!', '', {
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    });
  }
}
