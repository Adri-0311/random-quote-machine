import './App.css';
import QuoteBox from './features/quote/QuoteBox';

function App() {
  return (
    <div className='container'>
      <div className='row justify-content-center align-items-center'>
        <QuoteBox />
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
