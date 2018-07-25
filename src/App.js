import React, { Component } from 'react';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
      <h1 className="jammingTitle">Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <div className="SearchBar">

        </div>
        <div className="App-playlist">
          <div className="SearchResults">
            <h2>Results</h2>
          </div>
          <div className="Playlist">

          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
