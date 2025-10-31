import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function dataAgendamentoValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control = formGroup.value;

    if (!control)
      return null;

    const dataSelecionada = new Date(control);
    const dataAtual = new Date();

    dataSelecionada.setHours(0, 0, 0, 0);
    dataAtual.setHours(0, 0, 0, 0);

    if (dataSelecionada < dataAtual)
      return { dataAnterior: true };

    return null;
  }
}
