# INSTRUÇÕES PARA EXECUTAR OS TESTES E2E COM CYPRESS

## 1. Instalar dependências do projeto
A partir da raiz do projeto:

```
cd app_back-end
npm install
```
```
cd app_front-end\app_gerenciamento_users
npm install
```

## 2. Rodar Backend

No diretório `app_back-end`:
```
npm start
```

## 3. Rodar Frontend

Em outro terminal, no diretório `app_gerenciamento_users`:
```
npm run dev
```
## 4. Rodar os testes com Cypress via terminal

Em outro terminal, ainda no diretório `app_gerenciamento_users`:
```
npm run test:run
```

