import { Component, inject, Input, OnInit, output, OutputEmitterRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from "@angular/material/button";
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { AgendamentoService } from '../../core/services/agendamento.service';
import { AgendamentoDTO, CriarAgendamentoDTO } from '../../core/interfaces/agendamento';
import { dataAgendamentoValidator } from '../../core/validators/dataAgendamentoValidator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { Servico } from '../../core/interfaces/servico';

@Component({
  selector: 'app-form-agendamento',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatTimepickerModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatButtonModule],
  templateUrl: './form-agendamento.component.html',
  styleUrl: './form-agendamento.component.scss'
})
export class FormAgendamentoComponent implements OnInit {
  servicos: Servico[] = [
    { id: 1, nome:'Maquiagem' },
    { id: 2, nome: 'Penteado' },
    { id: 3, nome: 'Sobrancelha' },
    { id: 4, nome: 'Curso' }
  ];

  mensagemErro: string = '';

  @Input()
  agendamento?: AgendamentoDTO;

  public readonly dialog = inject(MatDialog);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly dateAdapter = inject(DateAdapter);
  private readonly agendamentoService: AgendamentoService = inject(AgendamentoService);

  openSnackBar: OutputEmitterRef<string> = output<string>();
  formSubmit: OutputEmitterRef<void> = output<void>();

  private readonly dialogRef = inject(MatDialogRef<Dialog>);

  form!: FormGroup;

  ngOnInit() {
    this.dateAdapter.setLocale('pt-BR');

    this.form = this.formBuilder.group({
      servico: [this.agendamento ? this.conversorSelect(this.agendamento.servico) : null, Validators.required],
      data: [this.agendamento ? this.formatDate(this.agendamento.dataHoraAgendamento) : null, [Validators.required, dataAgendamentoValidator()]],
      hora: [this.agendamento ? this.formatTime(this.agendamento.dataHoraAgendamento) : null, Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      const data = this.form.value.data;
      const hora = this.form.value.hora;

      const [ano, mes, dia] = data.split('-').map(Number);
      const [horas, minutos] = hora.split(':').map(Number);

      const dateTime = new Date(ano, mes - 1, dia, horas, minutos);
      dateTime.toISOString();

      const agendamento: CriarAgendamentoDTO = {
        servico: this.form.get('servico')?.value,
        dataHoraAgendamento: dateTime
      };

      if (this.agendamento) {
        this.agendamentoService.editarAgendamento(this.agendamento.id, agendamento).subscribe({
          next: () => {
            this.formSubmit.emit();
          },

          error: err => {
            this.mensagemErro = err.error.detail;
          }
        });

        return;
      }

      this.agendamentoService.criarAgendamento(agendamento).subscribe({
        next: () => {
          this.formSubmit.emit();
          this.dialogRef.close(true)
        },

        error: err => {
          this.mensagemErro = err.error.detail;
        }
      });

      return;
    }

    this.form.markAllAsTouched();
  }

  private formatDate(data: string | Date) {
    const d = new Date(data);
    return d.toISOString().split('T')[0];
  }

  private formatTime(data: string | Date) {
    const d = new Date(data);
    const horas = String(d.getHours()).padStart(2, '0');
    const minutos = String(d.getMinutes()).padStart(2, '0');
    return `${horas}:${minutos}`;
  }

  private conversorSelect(select: string): number {
    switch(select) {
        case 'Maquiagem': return 1;
        case 'Penteado': return 2;
        case 'Sobrancelha': return 3;
        case 'Curso': return 4;
        default: return 0;
    }
  }
}
