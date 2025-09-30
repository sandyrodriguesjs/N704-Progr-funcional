describe("Login", () => {
  before(() => {
    // Remove o usuário caso já exista
    cy.request({
      method: "POST",
      url: "http://localhost:3000/login",
      body: { email: "renato@example.com", password: "123456" },
      failOnStatusCode: false
    }).then((resp) => {
      // Se o usuário não existe, faz o cadastro
      if (resp.status === 404) {
        cy.request("POST", "http://localhost:3000/register", {
          name: "Renato",
          email: "renato@example.com",
          password: "123456"
        });
      }
    });
  });

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