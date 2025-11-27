context('Smoke Eco Bliss Bath', () => {
    // Test 1 : vérifier la page d'accueil 
    it('la page d accueil s affiche correctement', () => {
        cy.visit('http://localhost:4200/#/');

        // vérifier les éléments du header
        cy.contains('Accueil').should('exist');
        cy.contains('Produits').should('exist');
        cy.contains('Avis').should('exist');
        cy.contains('Connexion').should('exist');
        cy.contains('Inscription').should('exist');

        // vérifier le contenu principal
        cy.contains("Il y en a pour tous les gouts").should('exist');
        cy.contains("Voir les produits").should('exist');

        //vérifier la section : Ce que nous représentons
        cy.contains("Ce que nous représentons").should('exist');

        // Vérifier les 3 sous-parties
        cy.contains("Fiable").should('exist');
        cy.contains("Nature personnalisable").should('exist');
        cy.contains("Sans cruauté").should('exist');

        //vérifier le footer  
        cy.get('footer').should('exist');
    });

    // Test 2 : vérifier la page de connexion 
    it('afiche les chmaps du formulaire de connexion et le bouton de connexion', () => {
        cy.visit('http://localhost:4200/#/login')

        //vérifier que les champs de connexion existent
        cy.get('input[type="text"]').should('exist');
        cy.get('input[type="password"]').should('exist');
        cy.contains('button', 'Se connecter').should('exist');
    });

    // Test 3 : vérifier la page produits avant connexion 
    it('redirige vers les produits depuis la page d’accueil', () => {
        cy.visit('http://localhost:4200/#/');
        cy.contains('Voir les produits').click();

        //vérifier qu'on est sur la page produits
        cy.url().should("include", "/products");

        // Vérifier que le titre existe
        cy.contains('Nos produits').should('exist');

        // Vérifier qu'il y a au moins un produit affiché
        cy.get("article.mini-product").should("exist");

        // Vérifier que le bouton Consulter est présent
        cy.contains('button', 'Consulter').should("exist");
    });

    // Test 4 : vérifier la page produits après connexion 
    it('affcihe correctement la page produits après connexion', () => {
        cy.login();
        cy.contains('Produits').click();

        //vérifier qu'on est sur la page produits
        cy.url().should("include", "/products");

        // Vérifier que le titre existe
        cy.contains('Nos produits').should('exist');

        // Vérifier qu'il y a au moins un produit affiché
        cy.get("article.mini-product").should("exist");

        // Vérifier que le bouton Consulter est présent
        cy.contains('button', 'Consulter').should("exist");
    });

    // Test 5 :  vérifier l'ajout au panier 
    it('ajoute un produit au panier', () => {
        cy.login();
        cy.contains('Produits').click();

        //vérifier qu'on est sur la page produits
        cy.url().should("include", "/products");
        cy.contains('button', 'Consulter').first().click();

        // Récupérer le nom du produit
        cy.get('[data-cy="detail-product-name"]')
            .invoke('text')
            .as('productName');

        cy.wait(2000);
        cy.contains('button', 'Ajouter au panier').click();

        // vérifie que le produit est présent dans le panier
        cy.get('@productName').then((name) => {
            const productName = String(name);
            cy.contains(productName).should('exist');
        });
    });

    // Test 6 : vérifier la page Avis 
    it('la page Avis s affiche', () => {
        cy.visit('http://localhost:4200/#/');
        cy.contains('Avis').click();
        cy.url().should('include', '/reviews');
    });
})