# Projet "LEBONCOIN"

Une application MERN (MongoDB, Express, React, Node.js) inspirée de **Le Bon Coin**, permettant aux utilisateurs de publier et de gérer des annonces.

## **Fonctionnalités**

1. **Authentification** :
   - Inscription avec nom d'utilisateur, adresse e-mail et mot de passe.
   - Connexion sécurisée utilisant JSON Web Token (JWT).

2. **Gestion des annonces** :
   - Ajout, modification et suppression d'annonces.
   - Téléversement d'images pour les annonces.
   - Filtrage des annonces par catégorie.

3. **Gestion des droits d'accès** :
   - Seuls les auteurs peuvent modifier ou supprimer leurs propres annonces.

4. **Visualisation détaillée** :
   - Une page dédiée pour chaque annonce présentant ses détails complets.

## **Technologies utilisées**

### **Frontend**
- **React.js** : Bibliothèque JavaScript pour construire des interfaces utilisateur.
- **Bootstrap** : Pour le style et la mise en page responsive.
- **Axios** : Pour effectuer des requêtes API.
- **React Router** : Pour la navigation entre les pages.

### **Backend**
- **Node.js** : Environnement JavaScript côté serveur.
- **Express.js** : Framework web pour construire des applications API.
- **MongoDB** : Base de données NoSQL pour stocker les annonces.
- **Mongoose** : ODM pour MongoDB, facilitant l'interaction avec la base de données.
- **Multer** : Middleware pour gérer le téléversement de fichiers.
- **JSON Web Token (JWT)** : Pour l'authentification sécurisée.

## **Installation**

1. Clonez le projet :
   ```bash
   cd BonCoinProjet
#   b o n c o i n  
 