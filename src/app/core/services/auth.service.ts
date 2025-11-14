import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CadastroDTO, EditarPerfilDTO, EsqueceuSenhaDTO, LoginDTO, ResetarSenhaDTO, UsuarioDTO } from '../interfaces/usuario';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface CustomJwtPayload {
  nome: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly url = environment.apiUrl + '/Usuario';
  private readonly keyToken = 'token';
  private readonly keyExpiration = 'token-expiration;'

  loggedIn = signal(!!localStorage.getItem(this.keyToken));

  constructor() { }

  login(credenciais: LoginDTO): Observable<string> {
    return this.http.post(`${this.url}/login`, credenciais, { responseType: 'text' })
    .pipe(
      tap(response => {
        localStorage.setItem(this.keyToken, response);
        this.loggedIn.set(true);
      })
    );
  }

  cadastrar(credenciais: CadastroDTO) {
    return this.http.post(`${this.url}/cadastro`, credenciais);
  }

  editarPerfil(credenciais: EditarPerfilDTO): Observable<EditarPerfilDTO> {
    return this.http.put<EditarPerfilDTO>(this.url, credenciais);
  }

  getUsuarioPorId(): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${this.url}/exibirusuario`);
  }

  enviarEmailRecuperacaoSenha(email: EsqueceuSenhaDTO): Observable<void> {
    return this.http.post<void>(`${this.url}/forgot-password`, email);
  }

  resetarSenha(dto: ResetarSenhaDTO): Observable<void> {
    return this.http.post<void>(`${this.url}/reset-password`, dto);
  }

  getJWTToken(): string | null {
    return localStorage.getItem(this.keyToken);
  }

  getJWTClaim(field: keyof CustomJwtPayload): string {
    const token = this.getJWTToken();

    if(!token)
      return '';

    const dataToken = jwtDecode<CustomJwtPayload>(token)
    return dataToken[field];
  }

  isLoggedIn(): boolean {
    return this.loggedIn();
  }

  logout() {
    localStorage.removeItem(this.keyExpiration);
    localStorage.removeItem(this.keyToken);
    this.loggedIn.set(false);
    this.router.navigate(['/']);
  }

  getNome(): string {
    const nome = this.getJWTClaim('nome');
    return nome;
  }

  getRole(): string {
    const isAdmin = this.getJWTClaim('role');

    if(isAdmin === 'admin')
      return 'admin';

    return 'user';
  }
}
