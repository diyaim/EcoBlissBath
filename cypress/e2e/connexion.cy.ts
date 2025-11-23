context('connexion Eco Bliss Bath', () => {
    // Test 1 : connexion réussie avec des identifiants  valide
    it('connexion réussi avec identifiants valides', () => {
        cy.visit('http://localhost:4200/#/')
        cy.contains('Connexion').click()

        // rempli le champs email
        cy.get('input[type="text"]').type('test2@test.fr')

        // rempli le champs mot de passe
        cy.get('input[type="password"]').type('testtest')

        // clique sur le bouton "Se connecter"
        cy.contains('button', 'Se connecter').click();

        // Vérifier que la connexion a fonctionné
        cy.contains('Mon panier').should('exist');
    });
    // Test 2 : connexion refusée avec un mauvais mot de passe
    it('connexion refusée avec un mauvais mot de passe', () => {
        cy.visit('http://localhost:4200/#/')
        cy.contains('Connexion').click()

        // rempli le champs email
        cy.get('input').first().type('test2@test.fr')

        // rempli le champs mot de passe
        cy.get('input[type="password"]').type('mauvaisMotDePasse')

        // clique sur le bouton "Se connecter"
        cy.contains('button', 'Se connecter').click();

        cy.contains('Identifiants incorrects').should('exist');
    });
    // Test 3 : connexion refusée si les champs sont vides
    it('connexion refusée si les champs sont vides', () => {
        cy.visit('http://localhost:4200/#/')
        cy.contains('Connexion').click()
        
        // clique sur le bouton "Se connecter"
        cy.contains('button', 'Se connecter').click();

        cy.contains('Merci de remplir correctement tous les champs').should('exist');
    });
})