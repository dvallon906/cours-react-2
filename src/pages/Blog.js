import React, { useState, useEffect } from "react";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import axios from "axios";
import Article from "../components/Article";

const Blog = () => {
  const urlArticles = "http://localhost:3004/articles";
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);
  const [blogData, setBlogData] = useState([]);
  const [author, setAuthor] = useState("");
  const [actualizeBlogData, setActualizeBlogData] = useState(false);

  const getData = () => {
    // Pour loger le résultat de l'appel au webservice
    // axios.get(urlArticles).then((res) => console.log(res));
    axios.get(urlArticles).then((res) => setBlogData(res.data));
  };

  // Le useEffect se joue lorsque le composant est monté
  useEffect(() => {
    getData();
    setActualizeBlogData(false);
  }, [actualizeBlogData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.length < 140) {
      setError(true);
    } else {
      axios.post(urlArticles, {
        author,
        content,
        date: Date.now(),
      });
      setError(false);
      setAuthor("");
      setContent("");
      getData();
      setActualizeBlogData(true);
    }
  };

  return (
    <div className="blog-container">
      <Logo />
      <Navigation />
      <h1>Blog</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Nom"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <textarea
          // // Modification d'un style en fonction d'une condition
          // Sur le style border
          // Si ma condition et vraie `error``
          // Appliquer le style 1 sinon le style 2
          style={{ border: error ? "1px solid red" : "1px solid #61dafb" }}
          placeholder="Message"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        {error && <p>Veuillez écrire un minimum de 140 caractères</p>}
        <input type="submit" value="Envoyer" />
      </form>
      <ul>
        {blogData
          .sort((a, b) => b.date - a.date)
          .map((article, id) => (
            <Article key={article.id} article={article} />
          ))}
      </ul>
    </div>
  );
};

export default Blog;
