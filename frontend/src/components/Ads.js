import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Ads = () => {
  const [ads, setAds] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");

  const fetchAds = async () => {
    try {
      const response = await axios.get("http://localhost:8080/ads");
      setAds(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des annonces :", error);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const filteredAds = ads.filter((ad) =>
    categoryFilter ? ad.category === categoryFilter : true
  );

  const deleteAd = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/ads/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchAds();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'annonce :", error);
    }
  };

  return (
    <div>
      {/* Affichage des annonces avec deleteAd */}
      {filteredAds.map((ad) => (
        <div key={ad._id}>
          <h3>{ad.title}</h3>
          <button onClick={() => deleteAd(ad._id)}>Supprimer</button>
        </div>
      ))}
    </div>
  );
};

export default Ads;
