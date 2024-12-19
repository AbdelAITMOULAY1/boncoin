const Ad = require("../models/Model");

// Fonction pour récupérer toutes les annonces
const getAds = async (req, res) => {
    try {
        // Cherche toutes les annonces et remplace l'ID de l'auteur par ses informations
        const ads = await Ad.find().populate("author", "username email");
        // Renvoie les annonces avec un statut 200 (OK)
        res.status(200).json(ads);
    } catch (error) {
        // En cas d'erreur, renvoie un message d'erreur avec un statut 500 (Erreur serveur)
        res.status(500).json({ message: "Impossible de récupérer les annonces", error });
    }
};

// Fonction pour récupérer une annonce spécifique par son ID
const getAdById = async (req, res) => {
    try {
        // Cherche une annonce par son ID et remplace l'ID de l'auteur par ses informations
        const ad = await Ad.findById(req.params.id).populate("author", "username email");
        // Si l'annonce n'existe pas, renvoie un message d'erreur 404 (Non trouvé)
        if (!ad) {
            return res.status(404).json({ message: "Annonce non trouvée" });
        }
        // Renvoie l'annonce avec un statut 200 (OK)
        res.status(200).json(ad);
    } catch (error) {
        // En cas d'erreur, renvoie un message d'erreur avec un statut 500
        res.status(500).json({ message: "Impossible de récupérer l'annonce", error });
    }
};

// Fonction pour créer une nouvelle annonce
const createAd = async (req, res) => {
    try {
        // Extraction des informations de l'annonce depuis le corps de la requête
        const { title, description, category, price } = req.body;

        // Vérification des champs obligatoires pour la création de l'annonce
        if (!title || !description || !category || !price) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires" });
        }

        // Gestion du fichier image, si présent
        const image = req.file ? req.file.filename : null;

        // Création d'une nouvelle instance d'annonce
        const newAd = new Ad({
            ...req.body,
            image,
            author: req.user.id, // Associe l'auteur à l'annonce
        });
        
        // Enregistrement de l'annonce dans la base de données
        await newAd.save(); 

        // Renvoie une réponse avec le nouvel objet annonce et un statut 201 (Créé)
        res.status(201).json({ message: "Annonce créée avec succès", ad: newAd });
    } catch (error) {
        // En cas d'erreur, renvoie un message d'erreur avec un statut 500
        res.status(500).json({ message: "Impossible de créer l'annonce", error });
    }
};

// Fonction pour mettre à jour une annonce existante
const updateAd = async (req, res) => {
    try {
        // Extraction des informations mises à jour depuis le corps de la requête
        const { title, description, category, price } = req.body;

        // Gestion de l'image mise à jour, si présente
        const image = req.file ? req.file.filename : undefined;

        // Mise à jour de l'annonce dans la base de données
        const updatedAd = await Ad.findByIdAndUpdate(
            req.params.id,
            { title, description, category, price, ...(image && { image }) }, // Mise à jour conditionnelle de l'image
            { new: true } // Renvoie le document mis à jour
        );

        // Si l'annonce n'est pas trouvée, renvoie une erreur 404
        if (!updatedAd) {
            return res.status(404).json({ message: "Annonce introuvable" });
        }

        // Renvoie une réponse avec le document mis à jour et un statut 200 (OK)
        res.status(200).json({ message: "Annonce mise à jour avec succès", ad: updatedAd });
    } catch (error) {
        // En cas d'erreur, renvoie un message d'erreur avec un statut 500
        res.status(500).json({ message: "Impossible de mettre à jour l'annonce", error });
    }
};

// Fonction pour supprimer une annonce
const deleteAd = async (req, res) => {
    try {
        // Cherche et supprime l'annonce par son ID
        const ad = await Ad.findByIdAndDelete(req.params.id);

        // Si l'annonce n'est pas trouvée, renvoie une erreur 404
        if (!ad) {
            return res.status(404).json({ message: "Annonce introuvable" });
        }

        // Renvoie un message de succès avec un statut 200 (OK)
        res.status(200).json({ message: "Annonce supprimée avec succès" });
    } catch (error) {
        // En cas d'erreur, renvoie un message d'erreur avec un statut 500
        res.status(500).json({ message: "Impossible de supprimer l'annonce", error });
    }
};

// Exportation des fonctions du contrôleur
module.exports = {
    getAds,
    getAdById,
    createAd,
    updateAd,
    deleteAd
};
