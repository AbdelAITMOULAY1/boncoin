const jwt = require("jsonwebtoken");

// Middleware pour vérifier l'authentification de l'utilisateur via JWT
const authMiddleware = (req, res, next) => {
    // Récupère le token à partir des en-têtes de la requête
    const token = req.headers.authorization?.split(" ")[1];
    
    // Si aucun token n'est présent, renvoie une erreur 401 (Non autorisé)
    if (!token) {
        return res.status(401).send("Accès refusé. Aucun token fourni.");
    }

    try {
        // Vérifie et décode le token en utilisant la clé secrète
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Ajoute les informations décodées du token à l'objet requête pour un accès ultérieur
        req.user = decoded; 
        next(); // Passe au middleware ou à la route suivante
    } catch (error) {
        // Si le token est invalide, renvoie une erreur 400 (Mauvaise requête)
        res.status(400).send("Token invalide");
    }
};

// Exportation du middleware pour utilisation dans d'autres fichiers
module.exports = authMiddleware;
