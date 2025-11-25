context(' Panier Eco Bliss Bath', () => {

  // // Test 1 : vérifier que le produit s'ajoute au panier et le stock diminue 
  it('doit ajouter un produit au panier et diminuer le stock disponible', () => {

    //connexion
    cy.login();
    // Aller au panier 
    cy.cart();

    // récupérer la quantité avant ajout
    cy.countProductInCart()
      .then((qteAvant) => {
        //aller sur produit 
        cy.products();

        //consulter un produit
        cy.seeProduct(4);

        // récupérer le stock avant l'ajout au panier
        cy.StockValue()
          .then((stockAvant) => {

            //ajouter le produit au panier 
            cy.addToCart();

            // récupérer la quantité après ajout
            cy.countProductInCart()
              .then((qteApres) => {

                //comparer le avant et après
                expect(qteApres).to.eq(qteAvant + 1);
              });

            //  Retourner au produit 
            cy.products();
            // consulter le même produit 
            cy.seeProduct(4);
            // récupérer le stock après l'ajout au panier
            cy.StockValue()
              .then((stockApres) => {

                //comparer le stock avant et après
                expect(stockApres).to.eq(stockAvant - 1);
                cy.cart();
                cy.removeToCart();
              });
          });
      });
  });

  // Test 2 : vérifier qu'un produit avec un stock <1 ne s'ajoute pas au panier 
  it('empêche l ajout si le stock est inférieur à 1', () => {
    cy.login();
    //aller sur produit 
    cy.products();
    //consulter un produit
    cy.seeProduct(1);
    //récupérer le stock 
    cy.StockValue()
      .then((stock) => {
        // vérifier que le stock est <1
        expect(stock).to.be.lt(1);
        // Retour au produit
        cy.products();
        //consulter le produit
        cy.seeProduct(1);
        //ajouter le produit au panier 
        cy.addToCart();
        cy.removeToCart();
        // vérifier que ne produit n'a pas été ajouté 
        cy.url().should("include", "/product");
      });
  });

  // Test 3: vérifier les limites 
  it('ne doit pas ajouter un chiffre négatif', () => {
    //connexion
    cy.login();
    //aller sur produit 
    cy.products();
    //consulter un produit
    cy.seeProduct(4);
    //saisir un nombre négatif 
    cy.get('input[type="number"]')
      .clear()
      .type('-10');
    //ajouter le produit au panier 
    cy.contains('Ajouter au panier').click();
    cy.wait(2000);
    cy.url().should("include", "/product");
  });

  // Test 4: vérifier les limites 
  it('ne doit pas ajouter plus de 20 produits', () => {
    //connexion
    cy.login();
    //aller sur produit 
    cy.products();
    //consulter un produit
    cy.seeProduct(4);
    //saisir un nombre >20
    cy.get('input[type="number"]')
      .clear()
      .type('28');
    //ajouter le produit au panier 
    cy.addToCart();
    cy.removeToCart();
    cy.url().should("include", "/product");
  });

  // Test 5: Vérifiez la présence du champ de disponibilité du produit
  it('doit afficher la disponibilité du produit', () => {
    //connexion
    cy.login();
    //aller sur produit 
    cy.products();
    //consulter un produit
    cy.seeProduct(6);
    // Vérifier que le texte 'en stock' existe
    cy.contains("en stock").should("exist");
    // Vérifier qu'un nombre apparaît positif ou négatif
    cy.contains(/-?\d+\s*en stock/).should("exist");
  })

  // Test 6: vérifier que le produit s'ajoute via l'API 
  it('vérifier que le produit sajoute via lAPI', () => {
    cy.loginAPI()
    cy.wait(1000);
    // Aller au panier 
    cy.cart();
    // récupérer la quantité
    cy.countProductInCart().then((qteAvant) => {
      //aller sur produit 
      cy.products();
      //consulter un produit
      cy.seeProduct(7);
      // récuperer le non du prodit 
      cy.get('[data-cy="detail-product-name"]')
        .invoke('text')
        .then((txt) => cy.wrap(txt.trim()).as('productName'));

      //ajouter le produit au panier 
      cy.addToCart();
      //appel API
      cy.request({
        method: "GET",
        url: "http://localhost:8081/orders",
        headers: {
          Authorization: `Bearer ${Cypress.env("token")}`,
        }
      }).then((response: any) => {
        cy.log(response.body);
        const line = response.body.orderLines[0];
        expect(line.quantity).to.eq(qteAvant + 1);
        cy.get("@productName").then((uiName) => {
          expect(line.product.name).to.eq(uiName);
          cy.removeToCart();
        })
      });
    });
  });


})
