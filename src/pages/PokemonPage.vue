<template>
  <div v-if="pokemon">
    <h1>¿Quien es este Pokemon?</h1>
    <PokemonImage :pokemonId="pokemon.id" :showPokemon="showPokemon" />
    <PokemonOption :pokemons="pokemonArr" @selectPokemon="selectPokemon" />
  </div>
  <h1 v-else>Espere por Favor...</h1>

  <template v-if="showAnswer" class="fade-in">
    <h2>{{ message }}</h2>
    <button @click="newGame">Nuevo juego</button>
  </template>
</template>

<script>
import PokemonImage from "../components/PokemonImage.vue";
import PokemonOption from "../components/PokemonOption.vue";

import getPokemonOption from "@/helpers/getPokemonOption";

getPokemonOption();

export default {
  name: "PokemonPage",
  components: {
    PokemonImage,
    PokemonOption,
  },
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: "",
    };
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonOption();
      const rndInt = Math.floor(Math.random() * 4);
      this.pokemon = this.pokemonArr[rndInt];
    },
    selectPokemon({ name, id }) {
      this.showPokemon = true;
      this.showAnswer = true;
      if (name === this.pokemon.name) {
        this.message = `Correcto ${name}`;
      } else {
        this.message = `Opps, era ${this.pokemon.name}`;
      }
    },
    newGame() {
      this.showPokemon = false;
      this.showAnswer = false;
      this.pokemon = null
      this.mixPokemonArray();
    },
  },
  mounted() {
    this.mixPokemonArray();
  },
};
</script>
