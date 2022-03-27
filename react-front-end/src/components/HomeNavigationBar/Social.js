import react, { useEffect, useState } from "react";
import axios from "axios";
import "./Social.scss"
import LoadingSpinner from "../LoadingSpinner";

export default function Social(props) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    props.setIsLoading(true);
    axios.get(`https://newsapi.org/v2/everything?q=dogs&description=dogs&apiKey=de83984c2b2a4458907d159eede45a0b`).then((res) => {
      const articlesList = res.data.articles;
      setArticles(articlesList);
      props.setIsLoading(false);
    })
  }, []);

  const renderArticles = () => {
    return articles.map((article, index) => {
      return <div key={index} className="articleItem" onClick={() => window.open(`${article.url}`, "_blank")}>
        <h3 className="articleTitle">{article.title}</h3>
        <img className="articleImage" src={article.urlToImage} />
      </div>
    })
  }

  return (
    <>
      {props.isLoading ? <div className='loading_spinner'><LoadingSpinner /></div> :
        <div className="social-component">
          {renderArticles()}
        </div>
      }
    </>
  )
}