import { Component, inject, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { AgendamentoDTO } from '../../core/interfaces/agendamento';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-card-agendamento',
  imports: [DatePipe, MatButtonModule, MatIconModule, MatDialogModule, NgxMaskPipe],
  providers: [provideNgxMask()],
  templateUrl: './card-agendamento.component.html',
  styleUrl: './card-agendamento.component.scss'
})
export class CardAgendamentoComponent {
  agendamento: InputSignal<AgendamentoDTO> = input.required();
  alteracao: OutputEmitterRef<void> = output<void>();
  delecao: OutputEmitterRef<void> = output<void>();
  private readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: this.agendamento()
    });

    dialogRef.afterClosed().subscribe((atualizar?: boolean) => {
      if (atualizar)
        this.alteracao.emit();
    })
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: this.agendamento()?.id
    });

    dialogRef.afterClosed().subscribe((confirmado?: boolean) => {
      if (confirmado)
        this.delecao.emit();
    })
  }
}
