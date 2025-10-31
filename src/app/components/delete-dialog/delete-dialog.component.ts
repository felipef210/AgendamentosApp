import { Component, inject, output, OutputEmitterRef } from '@angular/core';
import { MatDialogContent, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AgendamentoService } from '../../core/services/agendamento.service';


@Component({
  selector: 'app-delete-dialog',
  imports: [MatDialogContent, MatDialogClose],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss'
})



export class DeleteDialogComponent {
  public readonly data: number = inject(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<DeleteDialogComponent>);
  private readonly agendamentoService: AgendamentoService = inject(AgendamentoService);

  openSnackBar: OutputEmitterRef<string> = output<string>();

  deletarAgendamento(id: number) {
    this.agendamentoService.exluirAgendamento(id).subscribe({
      next: () => {
        this.openSnackBar.emit('Agendamento cancelado com sucesso!');
        this.dialogRef.close(true);
      },

      error: err => {
        console.log('Ocorreu um erro ao cancelar o agendamento', err);
      }
    })
  }
}
