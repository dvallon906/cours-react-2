import axios from "axios";
import React, { useState } from "react";

const Article = ({ article }) => {
  const [isEditing, setIsEditing] = useState(false); // vrai si l'utilisateur a cliquer sur le bouton Êditer
  const [editContent, setEditContent] = useState(""); // le contenu de l'articel modifié par l'utilisateur

  const dateFormater = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    return newDate;
  };

  // Gérer la modification d'un article
  const handleEdit = () => {
    // Créer un objet data et le peupler avec les données de la Prop article
    const data = {
      author: article.author,
      content: editContent ? editContent : article.content,
      date: article.date,
      updatedDate: Date.now(),
    };

    // Envoyer l'objet data au webservice en vue d'une modification
    axios.put("http://localhost:3004/articles/" + article.id, data).then(() => {
      setIsEditing(false);
    });
  };

  // Gérer la suppression d'un article
  const handleDelete = () => {
    axios.delete("http://localhost:3004/articles/" + article.id);
    window.location.reload();
  };

  return (
    <div
      className="article"
      //Change la couleur de fond entre le mode consultaton et édition
      style={{ background: isEditing ? "#f3feff" : "white" }}
    >
      <div className="card-header">
        <h3>{article.author}</h3>
        <em>Posté le {dateFormater(article.date)}</em>
      </div>

      {/* Si on est en mode édition
      La textArea est remplis soit avec sa valeur avant édition soit avec la valeur éditée
      On mode consultation la textArea est remplis avec sa valeur non-éditée
      */}

      {isEditing ? (
        <textarea
          defaultValue={editContent ? editContent : article.content}
          autoFocus
          onChange={(e) => setEditContent(e.target.value)}
        ></textarea>
      ) : (
        <p>{editContent ? editContent : article.content}</p>
      )}

      <div className="btn-container">
        {/* 
        Le bouton Editer change son label en mode édition
        et change également la fonction invoquée sur click */}
        {isEditing ? (
          <button onClick={() => handleEdit()}>Valider</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Editer</button>
        )}

        <button
          onClick={() => {
            if (
              window.confirm("Voulez-vous vraiment supprimer cet article ?")
            ) {
              handleDelete();
            }
          }}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default Article;
