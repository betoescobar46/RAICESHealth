import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // <-- IMPORTACIÓN AÑADIDA

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Inject global styles for cleaner aesthetics
const style = document.createElement('style');
style.textContent = `
  body {
    /* Use a system font stack that prioritizes San Francisco on Apple devices. */
    font-family: -apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .hide-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  
  /* Animation for new prestacion cards */
  @keyframes slideInFadeIn {
    from {
      opacity: 0;
      transform: translateY(-15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .prestacion-card-enter {
    animation: slideInFadeIn 0.4s ease-out forwards;
  }

  /* Animation for toast notifications */
  @keyframes toast-in-right {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .animate-toast-in {
    animation: toast-in-right 0.5s ease-out forwards;
  }
`;
document.head.append(style);


const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);