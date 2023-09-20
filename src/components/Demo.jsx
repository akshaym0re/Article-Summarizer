import { useState, useEffect } from "react";
import axios from "axios";

import { copy, linkIcon, loader, tick } from "../assets";

const api_key = import.meta.env.VITE_RAPID_APIKEY;

const options = {
  method: "GET",
  url: "https://article-extractor-and-summarizer.p.rapidapi.com/summarize",
  params: {
    url: "https://time.com/6266679/musk-ai-open-letter/",
    length: "3",
  },
  headers: {
    "X-RapidAPI-Key": api_key,
    "X-RapidAPI-Host": "article-extractor-and-summarizer.p.rapidapi.com",
  },
};

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [articles, setArticles] = useState([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const arts = localStorage.getItem("art");
    setArticles(JSON.parse(arts));
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.request(options);
      setArticle({ ...article, summary: res.data.summary });

      let updatedArticles = [];
      if (articles) {
        updatedArticles = [
          ...articles,
          { ...article, summary: res.data.summary },
        ];
      } else {
        updatedArticles = [{ ...article, summary: res.data.summary }];
      }
      setArticles(updatedArticles);
      localStorage.setItem("art", JSON.stringify(updatedArticles));
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Search */}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            required
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            ↵
          </button>
        </form>
        {/* Browse URL Histry */}
        <div className="flex flex-col max-h-60 overflow-y-auto">
          {articles?.map((article, index) => (
            <div
              key={`link_${index}`}
              onClick={() => setArticle(article)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(article.url)}>
                <img
                  src={copied === article.url ? tick : copy}
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {article.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Display Results */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {loading ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Well, that wasn&apos;t supposed to heppen...
          </p>
        ) : (
          article?.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
        {/* {!article.summary && (
          
        )} */}
      </div>
    </section>
  );
};

export default Demo;
