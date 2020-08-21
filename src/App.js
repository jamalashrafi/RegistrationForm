import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './containers/HomePage';

function App() {
  return (
    <Router>
      <div className="grid-container">
        <header className="header">
          <div className="brand">Rubico IT Registration Form</div>
        </header>

        <main className="main">
          <div className="content">
            <Route exact={true} path="/" component={HomePage} />
          </div>
        </main>

        <footer className="footer">&copy; All rights reserved.</footer>
      </div>
    </Router>
  );
}

export default App;
