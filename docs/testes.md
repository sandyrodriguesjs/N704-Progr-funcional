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
## 5. Erro na execução do Teste

Remova o cache do Cypress
```
rmdir /s /q "%LOCALAPPDATA%\Cypress\Cache"
```

Reinstale o Cypress No terminal, dentro da pasta do seu projeto, execute:
```
npm install cypress --save-dev
npx cypress install
```


Tente abrir novamente
```
npx cypress open
```
