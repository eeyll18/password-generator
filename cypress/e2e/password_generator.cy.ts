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

  it("should generate a new password when the button is clicked", () => {
    let initialPassword = "";
    cy.get('input[type="text"][placeholder*="Your Password.."]')
      .invoke("val")
      .then((val) => {
        initialPassword = String(val);
      });

    cy.contains("button", "Generate New Password").click();

    cy.get('input[type="text"][placeholder*="Your Password.."]').should(
      (input) => {
        expect(input.val()).to.not.be.empty;
      }
    );
  });

  it('should copy password and show "Copied!" message', () => {
    cy.get('button[title="Copy Password"]').click();
    cy.contains("Copied!").should("be.visible");
    cy.contains("Copied!", { timeout: 3000 }).should("not.exist");
  });

  it("should change password length and content based on options", () => {
    cy.get("#uppercase").uncheck({ force: true });
    cy.get("#symbols").uncheck({ force: true });

    cy.contains("button", "Generate New Password").click();

    cy.get('input[type="text"][placeholder*="Your Password.."]').should(
      (input) => {
        const newPassword = String(input.val());
        expect(newPassword).to.match(/^[a-z0-9]+$/);
      }
    );
  });

  it("should display an error message if no character types are selected", () => {
    cy.get("#uppercase").uncheck({ force: true });
    cy.get("#symbols").uncheck({ force: true });
    cy.get("#lowercase").uncheck({ force: true });
    cy.get("#numbers").uncheck({ force: true });

    cy.contains("Select at least one character type!").should("be.visible");
  });
});
