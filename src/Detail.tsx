import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router";

export default class Detail extends Component<RouteComponentProps<any>, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      pokemon: null,
      locations: [],
    };
  }

  async getPokemon() {
    let pokemondId = this.props.match.params.id;
    await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemondId}`)
      .then((response) => response.json())
      .then((res) => {
        this.setState({ pokemon: res }, () => {
          this.getLocations(res.location_area_encounters);
        });
      })
      .catch((e) => {
        window.location.href = "/";
        console.log(e);
      });
  }

  getLocations(locationUrl: string) {
    fetch(locationUrl)
      .then((response) => response.json())
      .then((res) => {
        this.setState({ locations: res });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  componentDidMount() {
    this.getPokemon();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <div className="row">
              <div className="col-sm-12 text-center">
                {this.state.pokemon && (
                  <h3 className="text-capitalize">{`#${this.state.pokemon.id} ${this.state.pokemon.name}`}</h3>
                )}
                {this.state.pokemon &&
                  this.state.pokemon.types.map((type: any) => {
                    return (
                      <span
                        key={type.type.id}
                        className={`badge type-badge text-white bg-${type.type.name} d-inline-block mr-2`}
                      >
                        {type.type.name}
                      </span>
                    );
                  })}
              </div>
            </div>
            <div className="card my-3">
              <div className="card-header">
                <div className="card-title">Normal</div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  {this.state.pokemon && (
                    <img
                      src={this.state.pokemon.sprites.front_default}
                      alt=""
                    />
                  )}
                </div>
                <div className="col-sm-6">
                  {this.state.pokemon && (
                    <img src={this.state.pokemon.sprites.back_default} alt="" />
                  )}
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <div className="card-title">Shiny</div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <h5 className="text-center"></h5>
                </div>
                <div className="col-sm-6">
                  {this.state.pokemon && (
                    <img src={this.state.pokemon.sprites.front_shiny} alt="" />
                  )}
                </div>
                <div className="col-sm-6">
                  {this.state.pokemon && (
                    <img src={this.state.pokemon.sprites.back_shiny} alt="" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="card p-3">
              <div className="row">
                <div className="col-sm-12">
                <h5 className="text-left">Stats</h5>
                  <hr />
                  <ul>
                  {this.state.pokemon &&
                      this.state.pokemon.stats.map((stat: any) => {
                        return (
                          <li key={stat.stat.id} className="">
                            <b>{stat.stat.name.replace(/-/g, ' ')}</b> {stat.base_stat}
                          </li>
                        );
                      })}
                  </ul>
                  <h5 className="text-left">Abilities</h5>
                  <hr />
                  <ul>
                    {this.state.pokemon &&
                      this.state.pokemon.abilities.map((ability: any) => {
                        return (
                          <li key={ability.ability.id} className="text-capitalize">
                            {ability.ability.name.replace(/-/g, ' ')}
                          </li>
                        );
                      })}
                  </ul>
                  <h5 className="text-left">Locations</h5>
                  <hr />
                  <ul>
                    {this.state.locations &&
                      this.state.locations.map((location: any) => {
                        return (
                          <li key={location.location_area.id}>
                            {location.location_area.name.replace(/-/g, ' ')}
                          </li>
                        );
                      })}
                  </ul>
                  <h5 className="text-left">Moves</h5>
                  <hr />
                  {this.state.pokemon &&
                    this.state.pokemon.moves.map((move: any) => {
                      return (
                        <span
                          key={move.move.id}
                          className="badge text-white bg-secondary d-inline-block mr-2"
                        >
                          {move.move.name.replace(/-/g, ' ')}
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
