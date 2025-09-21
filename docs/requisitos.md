## Requisitos Funcionais (RF):

- **Cadastro de usuário (RF01)**
  - O sistema deve permitir que novos usuários se cadastrem informando nome, email e senha.

  `createUsers: app_front-end/app_gerenciamento_users/src/pages/register/page.jsx`
        
- **Login de usuário (RF02)**
    
  - O sistema deve permitir que o usuário faça login utilizando email e senha previamente cadastrados.

  `login: app_front-end/app_gerenciamento_users/src/pages/login/page.jsx`
 
- **Gerenciamento de sessão (RF03)**
    
  - O sistema deve manter a sessão do usuário ativa durante a utilização e encerrar após o usuário solicitar o logout.

  `logout: app_front-end/app_gerenciamento_users/src/pages/gerenciamentoUsers/page.jsx` 
        
- **Definição do tempo de pomodoro, pausa curta e pausa longa (RF04)**
    
  - O ciclo de foco do pomodoro deve ser definido em 25 min, a pausa curta em 5 min e a pausa longa em 15 min.

  `timerOptions.map (list comprehension): app_front-end\app_gerenciamento_users\src\pages\pomodoro\page.jsx`
		
- **Início, pausa e retomada do temporizador (RF05)**
    
  - O usuário deve poder iniciar, pausar e retormar o cronômetro a qualquer momento.
    
  `startTimer, iniciarContador (função de alta ordem), tick (função lambda e closure): app_front-end\app_gerenciamento_users\src\pages\pomodoro\page.jsx`

- **Alerta ao zerar o cronômetro (RF06)**

  - O sistema deve emitir algum tipo de aviso ao usuário para indicar que o cronômetro foi zerado. 
	
  `startTimer -> iniciarContador -> tick -> alert: app_front-end\app_gerenciamento_users\src\pages\pomodoro\page.jsx`

## Requisitos não-funcionais (RNF):

- **Segurança (RNF01)**
    
  - As senhas devem ser armazenadas utilizando hashing com bcrypt.
        
- **Usabilidade (RNF02)**
    
  - A interface deve ser simples, intuitiva e responsiva, funcionando em dispositivos desktop e mobile.
        
- **Disponibilidade (RNF03)**
    
  - O sistema deve estar disponível 24/7 com mínimo tempo de inatividade.
        
- **Performance (RNF04)**
    
  - O temporizador deve ser preciso, com atraso máximo de 1 segundo.
        
- **Compatibilidade (RNF05)**
    
  - O sistema deve funcionar nos principais navegadores modernos (Chrome, Edge, Firefox).
        
- **Confiabilidade (RNF06)**
    
  - O sistema deve garantir persistência dos dados de usuários e histórico, mesmo após falhas ou reinícios do servidor.
        
- **Privacidade (RNF07)**
    
  - Os dados pessoais dos usuários devem ser protegidos e não podem ser compartilhados com terceiros sem consentimento.