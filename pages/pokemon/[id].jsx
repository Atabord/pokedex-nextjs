import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from '../../components/layout';
import styles from '../../styles/pokemon.module.css';

export default function Pokemon({ pokemon }) {
  if(!pokemon || typeof pokemon !== 'object') {
    return null;
  }
  
  const spriteSRC = pokemon.sprites?.other?.home?.front_default 
    ?? pokemon.sprites?.other?.['official-artwork']?.front_default
    ?? '';

  return (
    <Layout>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <div className={styles['container']}>
        <Link href="/" className={styles['link']}>Back to Home</Link>
        <div className={styles['pokemon-info']}>
          <Image
            src={spriteSRC}
            alt={`${pokemon.name}-image`}
            height="400"
            width="400"
            className={styles['image']}
          />
          <div>
            <h1>{pokemon.name}</h1>
            {pokemon.types.map(({ type }) => (
              <p key={type.name}>{type.name}</p>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const pokemons = await (await fetch('https://pokeapi.co/api/v2/pokemon?limit=1154')).json();
  const pokemonList = pokemons.results.reduce(
    (total, pokemon, i) => [
      ...total,
      { params: { id: i + '' } },
      { params: { id: pokemon.name } }
    ],
    []);
  return {
    paths: pokemonList,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  try {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
    const pokemon = await data.json();

    if (!pokemon) {
      throw new Error('Not Found');
    }

    return {
      props: {
        pokemon
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}