# 🗓 AgendamentosApp

Aplicativo de gerenciamento de agendamentos para estúdio de beleza, permitindo que clientes agendem serviços e administradores gerenciem todos os agendamentos.

Dividido em backend ASP.NET Core e frontend Angular, com autenticação, CRUD de agendamentos e validação de horários.

## 🚀 Tecnologias

### Frontend:

- Angular 19 (Standalone Components);

- Angular Material 19;

- RxJS (Observables);

- Services;

- Interceptors;

- Guards

## 🏗 Estrutura do Projeto

### Frontend (AgendamentosApp)

Já o frontend foi construído seguindo o padrão standalone, bastante comum nas novas versões do Angular.

```
AgendamentosApp/
│
├─ pages/
│   ├─ home/          # Página de início da aplicação
│   ├─ cadastro/      # Cadastro de usuário
│   ├─ login/         # Login
│   ├─ agendamentos/  # Listagem e gerenciamento
│   └─ perfil/        # Edição de perfil
│
├─ components/
│   ├─ form-agendamento/  # Formulário de criação/edição de agendamentos
│   ├─ form-auth/         # Formulário login/cadastro/editar de perfil
│   ├─ card-agendamento/  # Cartão de agendamento
│   ├─ dialog/            # Modal de criação e edição de agendamentos
│   ├─ delete-dialog/     # Modal de deleção de agendamentos
│   └─ header/            # Cabeçalho
│
└─ core/
    ├─ guards
    ├─ interceptors
    ├─ interfaces
    ├─ services
    └─ validators
```

## ✨ Funcionalidades

### Frontend

📋 Listagem de agendamentos com async | pipe

📝 Formulários reativos com validação de campos

📬 Mensagens de sucesso (MatSnackBar)

❌ Mensagens de erro (Vindas do backend e exibidas no front)

🖥 UI responsiva

## 🔐 Autenticação e Permissões

- **Usuário cliente:** Pode ver, criar, editar e deletar apenas seus agendamentos;
- **Usuário administrador**: Pode ver, editar e deletar todos os agendamentos.

## 📌 Regras de Negócio

- Agendamentos devem ser futuros;

- Horário duplicado não permitido;

- Admin vê todos os agendamentos, usuário só os seus;

## 🛠 Como Rodar o Projeto

### Frontend

Tenha instalada uma das seguintes versões do node instaladas em sua máquina ```^18.19.1```, ```^20.11.1``` ou ```^22.0.0```, tenha também qualquer versão do Angular 19 instalada em sua máquina. Após providenciar esses requisitos entre no repositório **AgendamentosApp** e digite os seguintes comandos:

```
npm install     # Instala dependências
ng serve -o     # Roda frontend e abre no seu navegador padrão
```

