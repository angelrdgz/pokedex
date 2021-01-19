import React, { Component } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

export default class Home extends Component<{}, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      pokemons: [],
      page: 0,
      isLoading: true,
    };
  }
  componentDidMount() {
    this.getPokemons();
  }

  capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  async getPokemon(name: string) {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => response.json())
      .then((res) => {
        this.setState({ pokemons: this.state.pokemons.concat(res) });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getPokemons() {
    this.setState({ isLoading: true, page: this.state.page + 1 }, () => {
      fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=50&offset=${
          this.state.page == 1 ? 0 : (this.state.page - 1) * 50
        }`
      )
        .then((response) => response.json())
        .then((result) => {
          result.results.map((item: any) => {
            this.getPokemon(item.name);
            this.state.pokemons.sort((a:any, b:any) => (a.id > b.id) ? 1 : -1)
          });
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }

  render() {
    return (
      <div>
          <div className="row" id="scrollableDiv">
            {this.state.pokemons.map(function (pokemon: any, index: number) {
              return (
                <div className="col-sm-2 mb-2" key={index}>
                  <div className="card">
                    <Link to={`/pokemons/${pokemon.id}`}>
                      <img
                        src={pokemon.sprites.front_default}
                        className="sprite"
                        alt=""
                      />
                      <div className="card-body">
                        <p>
                          <span>
                            Pokedex number: <b>#{pokemon.id}</b>
                          </span>
                        </p>
                        <hr />
                        <p className="text-capitalize">{pokemon.name}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        <div className="row">
          <div className="col-sm-4 offset-sm-4 mt-3">
            <button
              className="btn btn-primary btn-block"
              onClick={() => this.getPokemons()}
            >
              Load more pokemons
            </button>
          </div>
        </div>
      </div>
    );
  }
}
