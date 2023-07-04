import { useRef, useEffect } from 'react';
import { fetchQuotes } from './service/fetchQuotes';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { newQuote } from './features/quote/quoteSlice';

function App() {
  // Establecer el acceso al estado de la store de redux
  const quoteState = useSelector((state) => state.quote);
  // Declarar el actualizador de la store
  const dispatch = useDispatch();

  const buttonTweet = useRef(null);
  const INIT_STATE = {
    quote: 'Loading quote...',
    author: 'Loading author...',
  };
  let quotesDataRef = useRef([]);

  useEffect(() => {
    fetchQuotes()
      .catch((error) => console.error(error))
      .then((jsonData) => {
        // almacenar el array de citas obtenidas
        quotesDataRef.current = jsonData.quotes;
      })
      .finally(() => {
        getQuote();
      });
  }, []);

  const setTweetLink = ({ quote, author } = INIT_STATE) => {
    buttonTweet.current.href = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(
      `"${quote}" ${author}`
    )}`;
  };

  /**
   * Obtain the new quote to generate the render and tweet link
   */
  const getQuote = () => {
    const quote = selectRandomQuote();
    // Actualizando la store de redux
    dispatch(newQuote(quote)); 
    setTweetLink(quote);
  };

  /**
   * Extrac quote object from quotesDataRef array
   * @returns {quote, author}
   */
  const selectRandomQuote = () => {
    if (quotesDataRef.current.length === 0) {
      return { quote: 'No more quotes avalible, sorry.' };
    }
    const random = Math.floor(Math.random() * quotesDataRef.current.length);
    const quote = quotesDataRef.current[random];
    // Delete from quotesData array the extracted quote to prevent duplicies
    quotesDataRef.current.splice(random, 1);
    return quote;
  };

  return (
    <div className='container'>
      <div className='row justify-content-center align-items-center'>
        <div className='col-8 p-4 mb-4 rounded' id='quote-box'>
          <blockquote id='text' className='text-center'>
            <p>
              <i className='me-2 fa-solid fa-quote-left'></i>
              {quoteState.quote}
              <i className='me-2 fa-solid fa-quote-right'></i>
            </p>
          </blockquote>
          <p id='author' className='text-end'>
            <span>-</span>
            &nbsp;
            {quoteState.author}
          </p>
          <div className='btn-container d-flex justify-content-around'>
            <button
              className='btn btn-success'
              id='new-quote'
              onClick={getQuote}
            >
              New quote
            </button>
            <a
              className='btn btn-primary'
              id='tweet-quote'
              href=''
              target='_blank'
              ref={buttonTweet}
            >
              Post in <i className='fa-brands fa-twitter'></i>
            </a>
          </div>
        </div>
        <p className='text-center'>
          Original app:&nbsp;
          <a
            href='https://random-quote-machine.freecodecamp.rocks/'
            target='_balank'
          >
            FCC : Random Quote Machine
          </a>
        </p>
        <p className='text-center'>
          <a
            href='https://github.com/Adri-0311/pomodoro-clock'
            className='github'
          >
            <i className='fa-brands fa-github'></i>
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
