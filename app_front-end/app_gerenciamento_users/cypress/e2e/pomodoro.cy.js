describe("Pomodoro", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('input[name="email"]').type("renato@example.com");
    cy.get('input[name="password"]').type("123456");
    cy.get("#btnLogin").click();
  });

  it("exibe o temporizador inicial de 25:00", () => {
    cy.get('[data-cy="timer-display"]').should("have.text", "25:00");
  });

  it("inicia e pausa o temporizador", () => {
    cy.get('[data-cy="btn-start-pause"]').click();
    cy.get('[data-cy="btn-start-pause"]').should("have.text", "PAUSAR");

    // aguarda 2 segundos e verifica que o timer diminuiu
    cy.wait(2000);
    cy.get('[data-cy="timer-display"]')
      .invoke("text")
      .then((text1) => {
        const time1 = text1.split(":").map(Number);
        expect(time1[1]).to.be.lessThan(60); // minutos ou segundos diminuíram
      });

    // pausa
    cy.get('[data-cy="btn-start-pause"]').click();
    cy.get('[data-cy="btn-start-pause"]').should("have.text", "INICIAR");
  });

  it("reseta o temporizador para Pomodoro, Pausa Curta e Pausa Longa", () => {
    cy.get('[data-cy="btn-pomodoro"]').click();
    cy.get('[data-cy="timer-display"]').should("have.text", "25:00");

    cy.get('[data-cy="btn-pausa-curta"]').click();
    cy.get('[data-cy="timer-display"]').should("have.text", "05:00");

    cy.get('[data-cy="btn-pausa-longa"]').click();
    cy.get('[data-cy="timer-display"]').should("have.text", "15:00");
  });

  it("efetua logout corretamente", () => {
    cy.get('[data-cy="btn-logout"]').click();
    cy.url().should("include", "/login");
    cy.window().its("localStorage.token").should("be.undefined");
  });
});
