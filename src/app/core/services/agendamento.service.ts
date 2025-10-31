import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { AgendamentoDTO, CriarAgendamentoDTO } from '../interfaces/agendamento';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.apiUrl + '/Agendamento';

  constructor() { }

  getAgendamentosAdmin(): Observable<AgendamentoDTO[]> {
    return this.http.get<AgendamentoDTO[]>(`${this.url}/listar`);
  }

  getAgendamentosCliente(): Observable<AgendamentoDTO[]> {
    return this.http.get<AgendamentoDTO[]>(`${this.url}/listarPorUsuario`);
  }

  criarAgendamento(agendamento: CriarAgendamentoDTO): Observable<AgendamentoDTO> {
    return this.http.post<AgendamentoDTO>(this.url, agendamento);
  }

  editarAgendamento(id: number, agendamento: CriarAgendamentoDTO): Observable<AgendamentoDTO> {
    return this.http.put<AgendamentoDTO>(`${this.url}/${id}`, agendamento);
  }

  exluirAgendamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
