import React from "react";
import { Link } from "react-router-dom";
// import ArticleContent from "../Pages/ArticleContent";

const Articles = ({ articles }) => {
  return (
    <>
      {/* {ArticleContent.map((data, index) => ( */}
      {articles.map((data, index) => (
        <div key={index} className="p-4 md:w-1/2">
          <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <Link to={`/article/${data.name}`}>
              <img
                className="lg:h-48 md:h-36 w-full object-cover object-center"
                src={data.thumbnail}
                alt="Not found"
              />
              {/* <h1>{data.title}</h1> */}
            </Link>
            {/* {console.log("ArticleContent =>", data.content)} */}

            <div className="p-6">
              <Link key={index} to={`/article/${data.name}`}>
                <h3 className="text-lg font-medium text-grey-900 mb-3">
                  {data.title}
                </h3>
              </Link>
              <p className="leading-releaxed mb-3">
                {data.content[0].substring(0, 100)} ...
              </p>
              <div className="flex item-center flex-wrap">
                <Link
                  className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
                  to={`/article/${data.name}`}
                >
                  Learn more about it
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Articles;

/*
Same error {} use ()
*/
