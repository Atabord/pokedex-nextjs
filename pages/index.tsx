import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout';
import PokemonCard from '../components/pokemon-card';

export default function Home({ pokemonList }) {
  return (
    <Layout>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Pokedex created with next" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles['pokedex']}>
        { pokemonList.map((pokemonInfo) => (
          <PokemonCard key={pokemonInfo.id} info={pokemonInfo}/>
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await (await fetch('https://pokeapi.co/api/v2/pokemon')).json();
  const pokemonList = await Promise.all(data.results.map(async (pokemon) => {
    const pokemonData = await (await fetch(pokemon.url)).json();
    return pokemonData;
  }));
  
  return {
    props: {pokemonList}
  }
}