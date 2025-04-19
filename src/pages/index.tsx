import Link from "next/link";
import Head from "next/head";

export default function Home() {
    return (
        <>
            <Head>
                <title>TuneQuest</title>
            </Head>

            <div className="h-screen overflow-scroll bg-gradient-to-t from-purple-200 to-pink-200 pb-12">
                <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
                            <span className="text-indigo-500">Tune</span>Quest
                        </h1>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Erstelle dein eigenes Musikspiel.
                        </h2>
                        <p className="mx-auto mt-12 max-w-xl text-lg leading-8 text-gray-600">
                            TuneQuest ist inspiriert vom beliebten Spiel Hitster. Mit TuneQuest kannst du deine eigene Version des Spiels erstellen – mit Songs, die deinem Musikgeschmack entsprechen. Nur Metal-Tracks? Kein Problem. Filmmusik erraten? Geht klar. Mit unserem Kartengenerator kannst du eine druckbare Vorlage für deine Spotify-Playlist erstellen.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                href="/api/login"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Spiel starten
                            </Link>
                            <Link
                                href="/REPLACEME_CREATE_URL"
                                target="_blank"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Eigenes Spiel erstellen →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
