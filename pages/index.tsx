import Head from 'next/head'
import styles from 'styles/Home.module.css'
import Layout from 'components/layout';
import PokemonCard from 'components/pokemon-card';
import { Pokemon, PokemonList } from 'types/pokemon.types';

interface Props {
  pokemonList: Pokemon[];
  pageInfo: Omit<PokemonList, 'results'>;
} 

export default function Home({ pokemonList }: Props) {
  return (
    <Layout>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Pokedex created with next" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className={styles['pokedex']}>
          { pokemonList.map((pokemonInfo) => (
            <PokemonCard key={pokemonInfo.id} info={pokemonInfo}/>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const { results, ...data } = await (await fetch('https://pokeapi.co/api/v2/pokemon?limit=16')).json() as PokemonList;
  const pokemonList = await Promise.all(results.map(async (pokemon) => {
    const pokemonData = await (await fetch(pokemon.url)).json();
    return pokemonData;
  }));
  
  return {
    props: {
      pokemonList,
      pageInfo: data
    }
  }
}