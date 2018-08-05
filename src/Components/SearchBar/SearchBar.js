import React from "react";

import "./SearchBar.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    };

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  search() {
    this.props.onSearch(this.state.searchTerm);
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      this.props.onSearch(this.state.searchTerm);
    }
  }

  handleTermChange(e) {
    const searchTerm = e.target.value;
    this.setState({
      searchTerm
    });
  }



  render() {
    return (
      <div className="SearchBar">
      <input className="searchInput"
          placeholder="Enter A Song, Album, or Artist"
          value={this.state.searchTerm}
          onChange={this.handleTermChange}
          onKeyPress={this.handleKeyPress}
        />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
