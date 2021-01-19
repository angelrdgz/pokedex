import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Detail from "./Detail";

export default class Layout extends Component<{}, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
    this.state = {
      redirect: null,
      searchStr: "",
    };
  }

  _handleKeyUp = (e:any) => {
    if( e.key == 'Enter' ){
      this.searchPokemon()
   }
  }

  private _inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {    
    this.setState({ searchStr: event.target.value });
  };

  searchPokemon() {
    if (this.state.searchStr)
      window.location.href = `/pokemons/${this.state.searchStr}`;
  }

  render() {
    return (
      <div>
        <div className="App-header">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
              <div className="row w-100">
                <div className="col-lg-3">
                  <a href="/">
                    <img src={logo} className="logo" alt="" />
                  </a>
                </div>
                <div className="col-lg-9">
                  <div className="input-group input-group-lg">
                    <input
                      className="form-control py-2 rounded-pill mr-1 pr-5"
                      type="text"
                      onKeyUp={this._handleKeyUp}
                      onChange={(event) =>
                        this._inputChangeHandler(event, "name")
                      }
                      placeholder="Search any pokemon by pokedex number or name"
                    />
                    <span className="input-group-append">
                      <button
                        className="btn rounded-pill border-0 ml-n5"
                        type="button"
                        onClick={() => this.searchPokemon()}
                      >
                        <FontAwesomeIcon className="icon" icon={faSearch} />
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div className="p-3">
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/pokemons/:id" component={Detail} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}
