import Image from "next/image";
import Link from "next/link";
import styles from '../styles/pokemon-card.module.css'

export default function PokemonCard({ info }) {
    const spriteSRC = info.sprites.other?.home?.front_default ?? info.sprites.front_default;
    return (
        <Link href={`/pokemon/${info.id}`} className={styles['poke-card__link']}>
            <div className={styles['pokemon-card']}>
                <Image
                    src={spriteSRC}
                    alt={`${info.name}-image`}
                    height="200"
                    width="200"
                />
                <p>
                    {info.id}. {info.name}
                </p>
            </div>
        </Link>
    )
}