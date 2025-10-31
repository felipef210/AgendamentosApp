export interface CriarAgendamentoDTO {
  servico: string;
  dataHoraAgendamento: Date;
}

export interface AgendamentoDTO {
  id: number;
  servico: string;
  dataHoraAgendamento: Date;
  clienteNome: string;
  clienteEmail: string;
  clienteTelefone: string;
}
