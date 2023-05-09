import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Article from "./Pages/Article";
import ArticlesList from "./Pages/ArticlesList";
import NotFound from "./Pages/NotFound";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <>
      {/* <div className="bg-red-500 text-center text-white">
        Main App Component
      </div> */}
      {/* <div className="max-w-screen-md mx-auto pt-20">
        <Home />
      </div> */}

      <Router>
        <NavBar />
        <div className="max-w-screen-md mx-auto pt-20">
          <Routes>
            {/* <div className="max-w-screen-md mx-auto pt-20"> */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/article" element={<Article />} />
            <Route path="/article/:name" element={<Article />} />
            <Route path="/articles-list" element={<ArticlesList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
