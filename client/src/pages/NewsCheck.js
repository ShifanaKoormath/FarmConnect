import React, { useState } from "react";

const NewsCheck = () => {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCheckNews = async () => {
    if (!query) return alert("Enter a topic to check news!");

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/news/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: query }),
      });

      const data = await response.json();
      setArticles(data.articles || []);
    } catch (error) {
      alert("Error fetching news.");
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h3>📰 News Fact-Checking</h3>
      <input type="text" className="form-control mt-2" placeholder="Enter a topic" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button className="btn btn-primary mt-3" onClick={handleCheckNews} disabled={loading}>{loading ? "Checking..." : "Check News"}</button>
      {articles.length > 0 && <ul className="list-group mt-3">{articles.map((article, i) => (
        <li key={i} className="list-group-item">
          <strong>{article.title}</strong> - {article.source}
          <br /><a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
        </li>
      ))}</ul>}
    </div>
  );
};

export default NewsCheck;
