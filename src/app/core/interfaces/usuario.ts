export interface CadastroDTO {
  nome: string;
  dataNascimento: Date;
  telefone: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

export interface LoginDTO {
  email: string;
  senha: string;
}

export interface UsuarioDTO {
  nome: string;
  dataNascimento: Date;
  telefone: string;
  email: string;
}

export interface EditarPerfilDTO {
  nome: string;
  telefone: string;
  email: string;
}

export interface EsqueceuSenhaDTO {
  email: string;
}

export interface ResetarSenhaDTO {
  email: string;
  token: string;
  novaSenha: string;
  confirmarSenha: string;
}
