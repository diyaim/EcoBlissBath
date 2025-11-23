context('API Eco Bliss Bath', () => {
    // test 1:Vérifier que le panier n'est pas accessible sans connexion
    it(' refuse l accès au panier sans connexion', () => {
        cy.request({
            method: "GET",
            url: 'http://localhost:8081/orders',
            failOnStatusCode: false, // ne pas faire échouer le test
        }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });

    // test 2: Vérifier que le login fonctionne avec des identifiants valides
    it(' login avec un utilisateur valide', () => {
        cy.request({
            method: "POST",
            url: "http://localhost:8081/login",
            body: {
                username: "test2@test.fr",
                password: "testtest",
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    // test 3: Vérifier que la connexion ne se fait pas avec des identifiants invalides
    it(' login avec un utilisateur invalide', () => {
        cy.request({
            method: "POST",
            url: "http://localhost:8081/login",
            failOnStatusCode: false, // ne pas faire échouer le test
            body: {
                username: "fauxtest2@test.fr",
                password: "mauvaisMotDePasse",
            },
        }).then((response) => {
            expect(response.status).to.be.oneOf([400, 401]);
        });
    });

    // test 4: Vérifier qu'on peut récupérer le panier après connexion
    it(' récupère le panier après connexion', () => {
        //connexion
        cy.request({
            method: "POST",
            url: "http://localhost:8081/login",
            body: {
                username: "test2@test.fr",
                password: "testtest",
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            const token = response.body.token; // récupère le Token
            //on récupère le panier
            cy.request({
                method: "GET",
                url: "http://localhost:8081/orders",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                expect(response.status).to.eq(200);
            });
        });
    });

    // test 5: Vérifier que l'on peut récupérer la fiche d'un produit
    it(' récupèrer le produit avec l id 3', () => {
        cy.request({
            method: "GET",
            url: "http://localhost:8081/products/3",

        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    // test 6: Vérifier que l'on peut ajouter un produit diposnible au panier 
    it(' ajouter un produit disponible au panier', () => {
        //connexion
        cy.request({
            method: "POST",
            url: "http://localhost:8081/login",
            body: {
                username: "test2@test.fr",
                password: "testtest",
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            const token = response.body.token; // récupère le Token
            //on récupère le panier
            cy.request({
                method: "PUT",
                url: "http://localhost:8081/orders/add",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: {
                    product: 7,
                    quantity: 2,
                },
            }).then((response) => {
                expect(response.status).to.eq(200);
            });
        });
    });

    // test 7: Vérifier que l'on peut pas ajouter un produit en répture de stock 
    it(' ajouter un produit en rupture', () => {
        //connexion
        cy.request({
            method: "POST",
            url: "http://localhost:8081/login",
            body: {
                username: "test2@test.fr",
                password: "testtest",
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            const token = response.body.token; // récupère le Token
            //on récupère le panier
            cy.request({
                method: "PUT",
                url: "http://localhost:8081/orders/add",
                failOnStatusCode: false,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: {
                    product: 3,
                    quantity: 2,
                },
            }).then((response) => {
                expect(response.status).to.eq(400);
            });
        });
    });

    // test 8: ajouter un avis
    it(' ajouter un avis', () => {
        //connexion
        cy.request({
            method: "POST",
            url: "http://localhost:8081/login",
            body: {
                username: "test2@test.fr",
                password: "testtest",
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            const token = response.body.token; // récupère le Token
            //on récupère le panier
            cy.request({
                method: "POST",
                url: "http://localhost:8081/reviews",

                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: {
                    title: "produits magnifiques",
                    comment: "les produits de cette marque sont parfaits",
                    rating: 4,
                },
            }).then((response) => {
                expect(response.status).to.eq(200);
            });
        });
    });

})