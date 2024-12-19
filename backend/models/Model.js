// src/components/Navbar.js

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../utils/auth";
import '../styles/Navbar.css'; // Importation du fichier CSS pour le style de la barre de navigation

const Navbar = () => {
  const navigate = useNavigate(); // Hook pour gérer la navigation programmatique

  // Fonction pour gérer la déconnexion de l'utilisateur
  const handleLogout = () => {
    logout(); // Appelle la fonction de déconnexion
    navigate("/"); // Redirige vers la page d'accueil après déconnexion
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light"> {/* Barre de navigation avec styles Bootstrap */}
      <div className="container-fluid">
        <Link className="navbar-brand" to="/"> {/* Lien vers la page d'accueil */}
          BIENVENUE SUR LEBONCOIN 
        </Link>
        <button
          className="navbar-toggler" // Bouton pour activer/désactiver la barre de navigation mobile
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav" // Cible l'élément de la barre de navigation à basculer
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span> {/* Icône du bouton toggle */}
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto"> {/* Liste des éléments de navigation alignée à droite */}
            {isAuthenticated() ? ( // Vérifie si l'utilisateur est authentifié
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/ads"> {/* Lien vers la page des annonces */}
                    Annonces
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-danger nav-link" // Bouton de déconnexion stylisé
                    onClick={handleLogout} // Appelle la fonction de déconnexion lors du clic
                    style={{ border: "none", background: "none" }} // Style inline pour masquer le style par défaut
                  >
                    Déconnexion
                  </button>
                </li>
              </>
            ) : ( // Si l'utilisateur n'est pas authentifié
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/"> {/* Lien vers la page de connexion */}
                    Connexion
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register"> {/* Lien vers la page d'inscription */}
                    Inscription
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; // Exportation du composant Navbar pour l'utiliser dans d'autres parties de l'application
