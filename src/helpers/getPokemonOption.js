import pokemonApi from '../api/pokemon'

const getPokemons = () =>{

  // sale undifined y solo el Array sale vacio

  const pokemonArr = Array.from( Array(650) )

  return pokemonArr.map( (_,index) => index + 1 ) 

}

const getPokemonOption = async() =>{

  // Acomodar aleatoriamente el array
  const mixedPokemon = getPokemons()
                        .sort( ()=> Math.random() - 0.5 )
  
  const pokemons = await getPokemonName( mixedPokemon.splice(0,4) )

  return pokemons
}

const getPokemonName = async( [ a,b,c,d ] = [] ) =>{

  const promiseArr = [ 
    pokemonApi.get(`/${a}`),
    pokemonApi.get(`/${b}`),
    pokemonApi.get(`/${c}`),
    pokemonApi.get(`/${d}`)
  ]

  const [ p1, p2, p3, p4 ] = await Promise.all( promiseArr )
  
  return [ 
    { name:p1.data.name, id:p1.data.id },
    { name:p2.data.name, id:p2.data.id },
    { name:p3.data.name, id:p3.data.id },
    { name:p4.data.name, id:p4.data.id }
  ]
}

export default getPokemonOption;