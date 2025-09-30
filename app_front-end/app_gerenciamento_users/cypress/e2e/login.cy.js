describe("Login", () => {
  it("deve permitir login com credenciais válidas", () => {
    cy.visit("/login");

    cy.get('input[name="email"]').type("renato@example.com");
    cy.get('input[name="password"]').type("123456");
    cy.get("#btnLogin").click();

    cy.url().should("include", "/pomodoro");
    cy.contains("Pomodoro").should("exist");
  });

  it("não deve permitir login com senha incorreta", () => {
    cy.visit("/login");

    cy.get('input[name="email"]').type("renato@example.com");
    cy.get('input[name="password"]').type("senhaerrada");
    cy.get("#btnLogin").click();

    cy.contains("Senha inválida!").should("exist");
  });
});
