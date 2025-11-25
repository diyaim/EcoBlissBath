# Eco Bliss Bath – Tests Cypress

Ce projet contient l’ensemble des **tests automatisés Cypress** réalisés pour l’application web **Eco Bliss Bath**.

Les tests couvrent :

- Tests API  
- Tests fonctionnels (Connexion & Panier)  
- Smoke tests  
- Test de sécurité XSS  

Ce README explique comment **installer**, **lancer les tests** et **générer les rapports**.

---

## 1. Prérequis

Avant de commencer :

- Node.js **≥ 16**
- npm **≥ 8**
- Backend Eco Bliss Bath lancé (port **8081**)
- Frontend Eco Bliss Bath lancé (port **4200**)

---

## 2. Installation du projet

Dans un terminal, à la racine du projet :

```bash
npm install
```
Cela installe Cypress et toutes les dépendances nécessaires.

## 3. Lancer Cypress en mode interface

```bash
npm run cypress:open
```
Cela ouvre l’interface graphique de Cypress, veuillez ensuite suivre les étapes suivantes :
- Cliquer sur E2E Testing
- Cliquer sur le navigateur de votre choix (Chrome/Edge/Electron/Firefox)
- Cliquer sur Start E2E Testing
- Cliquer sur le test de votre choix sur la nouvelle page des specifications

## 4. Lancer tous les tests en mode headless

```bash
npm run cypress:run
```
Ce mode exécute tous les tests dans le terminal.

## 5. Générer un rapport de tests

```bash
npm run cypress:report
```
Les résultats apparaîtront dans 
```bash
cypress/reports/junit
```