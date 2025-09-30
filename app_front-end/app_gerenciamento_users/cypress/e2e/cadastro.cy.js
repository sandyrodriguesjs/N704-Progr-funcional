describe("Cadastro de Usuário", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("deve permitir que um novo usuário se cadastre", () => {
    cy.get('input[name="name"]').type("Usuário Teste");
    cy.get('input[name="email"]').type(`teste${Date.now()}@example.com`); // evitar duplicidade
    cy.get('input[name="password"]').type("123456");

    cy.get("#btnCadastrar").click();

    cy.contains("Cadastro realizado com sucesso").should("exist");
  });

  it("não deve permitir cadastro com campos obrigatórios vazios", () => {
  
    cy.get('input[name="name"]').should("have.value", "");
    cy.get('input[name="email"]').should("have.value", "");
    cy.get('input[name="password"]').should("have.value", "");

    cy.get("#btnCadastrar").click();

    cy.contains("Cadastro realizado com sucesso").should("not.exist");
  });

  it("não deve permitir cadastro com e-mail já existente", () => {
    const emailDuplicado = `testeDuplicado1${Date.now()}@example.com`;

    // primeiro cadastro
    cy.get('input[name="name"]').type("Usuário Teste");
    cy.get('input[name="email"]').type(emailDuplicado);
    cy.get('input[name="password"]').type("123456");
    cy.get("#btnCadastrar").click();

    cy.contains("Cadastro realizado com sucesso").should("exist");

    // tenta cadastrar de novo com o mesmo email
    cy.visit("/register");
    cy.get('input[name="name"]').type("Outro Usuário");
    cy.get('input[name="email"]').type(emailDuplicado);
    cy.get('input[name="password"]').type("abcdef");
    cy.get("#btnCadastrar").click();

    cy.contains("Email já cadastrado").should("exist");
  });
});
