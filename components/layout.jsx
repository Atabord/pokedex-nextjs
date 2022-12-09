import Image from "next/image";
import { useRouter } from "next/router";
import styles from '../styles/layout.module.css';

export default function Layout({ children }) {
    const router = useRouter();

    if (router.isFallback) {
      return <div>Loading...</div>
    }

    return <div className={styles.container}>
        <header className={styles.header}>
            <Image
                priority
                src="/images/pokemon-logo.webp"
                alt="pokemon-logo"
                width="600"
                height="221"
            />
            <h1 className="">
            Pokedex in Next.js
            </h1>
        </header>
        <main>
            { children }
        </main>
    </div>
}