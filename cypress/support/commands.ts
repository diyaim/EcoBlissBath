/// <reference types="cypress" />
// ***********************************************

// Déclaration TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
      cart(): Chainable<void>;
      countProductInCart(): Chainable<number>;
      products(): Chainable<void>;
      seeProduct(index: number): Chainable<void>;
      StockValue(): Chainable<number>;
      addToCart(): Chainable<void>;
      removeToCart(): Chainable<void>;
      setQuantity(quantity: number): Chainable<void>;
      getCart(): Chainable<any[]>;
      loginAPI(): Chainable<void>;
    }
  }
}

// Methode : connexion
Cypress.Commands.add('login', () => {
  // Aller sur la page login
  cy.visit('http://localhost:4200/#/login');

  // Saisie des identifiants
  cy.get('input[type="text"]').type('test2@test.fr');
  cy.get('input[type="password"]').type('testtest');

  // Clic sur le bouton
  cy.contains('button', 'Se connecter').click();
 
// Vérifier que la connexion est ok côté UI
cy.contains('Déconnexion');
});

// Methode : Aller au panier 
Cypress.Commands.add('cart', () => {
  cy.contains('Mon panier').click();
  cy.url().should("include", "/cart");
  cy.contains('Commande');
  cy.wait(2000);
});

// Methode : récupérer la quantité avant ajout 
Cypress.Commands.add('countProductInCart', () => {
  return cy.get('body').then(($body) => {
    const el = $body.find('[data-cy="cart-line-quantity"]');

    if (el.length > 0) {
      // récupérer la valeur de l'input
      const val = el.val();
      return val ? parseInt(val.toString(), 10) : 0;
    }
    // si l'élément n'existe
    return 0;
  });
});

// Methode : aller sur produit 
Cypress.Commands.add('products', () => {
  cy.contains('Produits').click();
  cy.url().should("include", "/product");
  cy.contains('Nos produits');
});

// Methode : consulter un produit
Cypress.Commands.add('seeProduct', (index: number) => {
  cy.get('[data-cy="product-link"]').eq(index - 1).click();
  cy.contains('Ajouter au panier');
  cy.wait(1000);
}
);
// Methode : récupérer le stock
Cypress.Commands.add('StockValue', () => {
  return cy.get('[data-cy="detail-product-stock"]').invoke("text").then((txt) => {
    // Extraire uniquement le nombre, même s'il est négatif  
    const match = txt.match(/-?\d+/);   // peut être null
    const stockAvant = match ? parseInt(match[0], 10) : 0;
    return stockAvant;
  });
}
);

// Methode : ajouter au panier 
Cypress.Commands.add('addToCart', () => {
  cy.contains('Ajouter au panier').click();
  cy.url().should("include", "/cart");
  cy.contains('Commande');
  cy.wait(2000);
});

// Methode : supprimer le produit du panier
Cypress.Commands.add('removeToCart', () => {
  cy.get('[data-cy="cart-line-delete"]').click();
  cy.contains('Votre panier est vide.');
  cy.wait(2000);
});

// Methode : login API
Cypress.Commands.add("loginAPI", () => {
  cy.intercept('POST', 'http://localhost:8081/login').as('loginRequest');

  // Aller sur la page login
  cy.visit('http://localhost:4200/#/login');

  // Saisie des identifiants
  cy.get('input[type="text"]').type('test2@test.fr');
  cy.get('input[type="password"]').type('testtest');

  // Clic sur le bouton
  cy.contains('button', 'Se connecter').click();

  // Attendre la requête login
  cy.wait('@loginRequest').then(({ response }) => {
    const token =
      response?.body?.token || response?.body || null;

    if (!token) {
      throw new Error("Impossible de récupérer le token JWT !");
    }

    // Stockage dans Cypress
    Cypress.env("token", token);

    cy.log("Token récupéré :", token.substring(0, 20) + "...");
  });

})
export { };