context('Xss Eco Bliss Bath', () => {
    it('ne doit pas exécuter un script xss dans le formulaire d avis', () => {
        cy.login();

        //  Aller sur la page avis
        cy.contains("Avis").click();

        cy.url().should("include", "/reviews");

        // empêcher l'exécution d'un script
        cy.on("window:alert", () => {
            throw new Error(" XSS exécuté ");
        });

        const scriptMalveillant = '<script>alert("XSS")</script>';

        // Remplir le formulaire 
        cy.get('[data-cy="review-input-rating-images"] img').eq(3).click();
        cy.get('input#title').type("AttaqueXSS");
        cy.get('input#comment').type(scriptMalveillant);

        cy.contains("button", "Publier").click();

        // Vérifier que l'avis est bien enregistré
        cy.contains("AttaqueXSS").should("exist");
    })

})