describe("Password Generator E2E Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should load the page and generate an initial password", () => {
    cy.contains("h1", "Password Generator").should("be.visible");
    cy.get('input[type="text"][placeholder*="Your Password.."]').should(
      (input) => {
        expect(input.val()).to.not.be.empty;
      }
    );
  });
});
