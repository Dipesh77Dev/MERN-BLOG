import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ArticleContent from "./ArticleContent";

import Articles from "../Components/Articles";
import CommentsList from "../Components/CommentsList";
import AddCommentForm from "../Components/AddCommentForm";
import NotFound from "./NotFound";

const Article = () => {
  const { name } = useParams();
  const article = ArticleContent.find((article) => article.name === name);
  const [articleInfo, setArticleInfo] = useState({ comments: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/articles/${name}`);
      const body = await result.json();
      console.log(body);
      setArticleInfo(body);
    };
    fetchData();
    // console.log("Component Mounted");
  }, [name]); // once the url parameter [name] change the useEffect will run.

  if (!article) {
    return (
      <h1>
        Sorry, but this article does not exist & <NotFound />
      </h1>
    );
  }
  const otherArticles = ArticleContent.filter(
    (article) => article.name !== name
  );
  return (
    <>
      <div>
        <h1 className="sm:text-4xl text-2xl font-bold my-6 text-grey-900">
          {article.title}
        </h1>

        {article.content.map((data, index) => (
          <p className="mx-auto leading-relaxed text-base mb-4" key={index}>
            {data}
          </p>
        ))}

        <CommentsList comments={articleInfo.comments} />

        <AddCommentForm articleName={name} setArticleInfo={setArticleInfo}/>

        <h1 className="sm:text-2xl text-xl font-bold my-4 text-grey-900">
          {" "}
          Other Articles{" "}
        </h1>
        <div className="flex flex-wrap -m-4">
          <Articles articles={otherArticles} />
        </div>
      </div>
    </>
  );
};

export default Article;

/*
Starting - 
<div>Article</div>
<h1 className="sm:text-4xl text-2xl font-bold my-6 text-grey-900"> SINGLE ARTICLE!!!
  <hr />
  This is the {name} ARTICLE!!!
  <hr />
</h1> 
*/

/* 
<p className="mx-auto leading-relaxed text-base mb-4">
  {article.content}
</p> 

{ArticleContent.map((data, index) => {
<p className="mx-auto leading-relaxed text-base mb-4" key={index}>
  {data}
</p>;
})} 
*/

/*
Error -
{article.content.map((data, index) => {
  <p className="mx-auto leading-relaxed text-base mb-4" key={index}>
    {data}
  </p>
})}

Soln - article.map(() => ())
rather than 
article.map(() => {})
*/
