import { useRef, useState, useEffect } from 'react';
import fetchQuote from './service/fetchQuote';
import './App.css';

function App() {
  const buttonTweet = useRef(null);

  const [quoteData, setQuoteData] = useState([
    {
      quote: 'Loading quote...',
      author: 'Loading author...',
    },
  ]);

  const setTweetLink = (quote, author ) => {
    buttonTweet.current.href = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(
      `"${quote}" ${author}`
    )}`;
  };

  const newQuote = () => {
    fetchQuote().then((data) => {
      setQuoteData(data);
      setTweetLink(data[0].quote, data[0].author);
    });
  };

  useEffect(newQuote, []);

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-8 p-4 rounded" id="quote-box">
          <h3 id="text" className="text-center">
            <i className="me-2 fa-solid fa-quote-left"></i>
            {quoteData[0].quote}
          </h3>
          <p id="author" className="text-end">
            - <span>{quoteData[0].author}</span>
          </p>
          <div className="btn-container d-flex justify-content-around">
            <button
              className="btn btn-success"
              id="new-quote"
              onClick={newQuote}
            >
              New quote
            </button>
            <a
              className="btn btn-primary"
              id="tweet-quote"
              href=""
              target="_blank"
              ref={buttonTweet}
            >
              Post in <i className="fa-brands fa-twitter"></i>
            </a>
          </div>
        </div>
        <p className="text-center">
          Original app:&nbsp;
          <a
            href="https://random-quote-machine.freecodecamp.rocks/"
            target="_balank"
          >
            FCC : Random Quote Machine
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
