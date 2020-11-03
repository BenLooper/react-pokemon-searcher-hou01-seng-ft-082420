import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

class PokemonPage extends React.Component {

  constructor(){
    super();
    this.state = ({
      pokemons: [],
      filteredPokemons: []
    })
  }

  componentDidMount(){
    fetch('http://localhost:3000/pokemon')
    .then(res=>res.json())
    .then(pokemons=>this.setState({
      pokemons:pokemons,
      filteredPokemons:pokemons
    }))
  }

  search = (e) => {
    let name = e.target.value.toLowerCase();
    this.setState({
      filteredPokemons: this.state.pokemons.filter(pokemon=>pokemon.name.includes(name))
    })
  } 

  addPokemon = (pokemon) => {
    fetch('http://localhost:3000/pokemon', {
      method:"POST",
      headers: {
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify(pokemon)
    })
    .then(res=>res.json())
    .then(newPokemon => this.setState({
      pokemons: [...this.state.pokemons,newPokemon],
      filteredPokemons: [...this.state.pokemons,newPokemon]
    }))
  }

  render() {
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm addPokemon={this.addPokemon}/>
        <br />
        <Search search={this.search}/>
        <br />
        <PokemonCollection pokemons={this.state.filteredPokemons}/>
      </Container>
    )
  }
}

export default PokemonPage
