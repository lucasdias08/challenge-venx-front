describe('Verify login/logoff UI', () => {
    it('Loding page funcionally?', () => {
        cy.visit('/');
        cy.get("#root > div > div > table > tbody > tr:nth-child(50) > td:nth-child(4) > div > button");
    });

    it('View funcionally?', () => {
        cy.visit('/');
        cy.get("#root > div > div > table > tbody > tr:nth-child(50) > td:nth-child(4) > div > button").click();
        cy.get("body > div.fade.modal.show > div > div > div.bg-primary.modal-header > button").click();
    });

    it('Loading More funcionally?', () => {
        cy.get("#root > div > div > div.d-flex.justify-content-center.w-50.align-self-center > button").click();
        cy.get("#root > div > div > table > tbody > tr:nth-child(100) > td:nth-child(4) > div > button");
    })
})