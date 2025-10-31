import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from "@angular/material/dialog";
import { FormAgendamentoComponent } from "../form-agendamento/form-agendamento.component";
import { AgendamentoDTO } from '../../core/interfaces/agendamento';

@Component({
  selector: 'app-dialog',
  imports: [MatDialogContent, FormAgendamentoComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  public readonly data: AgendamentoDTO = inject(MAT_DIALOG_DATA);

  private readonly dialogRef = inject(MatDialogRef);

  fecharDialog() {
    this.dialogRef.close(true);
  }
}
