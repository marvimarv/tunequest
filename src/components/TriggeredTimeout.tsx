import React, { useState, useEffect, useRef } from 'react';
import { PauseIcon } from '@/components/PauseIcon';
import { PlayIcon } from '@/components/PlayIcon';

type Status = 'disabled' | 'pending' | 'triggered'

const getButtonText = (status: Status, seconds: number): string => {
    switch (status) {
        case "disabled": return `DRÜCKEN, UM BEI ${seconds} SEKUNDEN ZU STOPPEN`;
        case "pending": return `STOPPEN BEI ${seconds} SEKUNDEN`;
        case "triggered": return "ZEITLIMIT ERREICHT";
        default: return "Fehler beim Abrufen des Button-Texts";
    }
};

type TriggeredTimeoutProps = {
    enabledByDefault: boolean;
    setEnabledByDefault: (value: boolean) => void;
    onTimeout: () => void;
    targetSeconds: number;
    setTargetSeconds: (value: number) => void;
    soundEnabled: boolean,
    setSoundEnabled: (value: boolean) => void;
};

const TriggeredTimeout: React.FC<TriggeredTimeoutProps> = ({ onTimeout, enabledByDefault, setEnabledByDefault, targetSeconds, setTargetSeconds, soundEnabled, setSoundEnabled }) => {
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [status, setStatus] = useState<Status>(enabledByDefault ? "pending" : "disabled");
    const [showHelp, setShowHelp] = useState<boolean>(false);

    // stores the interval id so we can stop the timer from anywhere
    const intervalIdRef = useRef<number | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // start interval after loading component
    useEffect(() => {
        intervalIdRef.current = window.setInterval(() => {
            setElapsedSeconds(prevSeconds => prevSeconds + 1);
        }, 1000);

        // clean up interval on component unmount
        return () => {
            if (intervalIdRef.current !== null) {
                clearInterval(intervalIdRef.current);
            }
        }
    }, []);

    useEffect(() => {

        const playTriggerSound = () => {
            if (audioRef.current && soundEnabled) {
                audioRef.current.play();
            }
        };

        // fire triggered timeout if the elapsed time is greater than the target seconds
        if (status == "pending" && elapsedSeconds >= targetSeconds) {
            playTriggerSound();
            setStatus("triggered");
            if (intervalIdRef.current !== null) {
                clearInterval(intervalIdRef.current);
                intervalIdRef.current = null;
            }
            // propagate to outside
            onTimeout();
        }
    }, [elapsedSeconds, onTimeout, status, targetSeconds, soundEnabled]);

    return (
        <div className="mt-16">
            <div className="flex justify-between">
                <div>Verstrichene Zeit: {elapsedSeconds} Sekunden</div>
                <div className="text-right text-blue-600 underline hover:no-underline"
                     onClick={() => setShowHelp(true)}>
                     Was ist das?
                </div>
            </div>
            <button
                type="button"
                className={`group relative flex h-24 w-full flex-shrink-0 items-center justify-center rounded-full text-white text-3xl mt-4
                    ${status != 'disabled' ? 'bg-red-700 focus:ring-red-700' : 'bg-slate-700 focus:ring-slate-700'} 
                    focus:outline-none focus:ring-2 focus:ring-offset-2`}
                onClick={() => setStatus((status) => (status === "disabled" ? "pending" : "disabled"))}
            >
            {getButtonText(status, targetSeconds)}
            </button>
            <div>
                <input className="flex w-full mt-4"
                    type="range"
                    min="1"
                    max="99"
                    value={targetSeconds}
                    onChange={(event) => {setTargetSeconds(Number(event.target.value))}}
                />
            </div>
            <audio ref={audioRef} src="/air-horn.mp3" />
            <div className="flex items-center mt-4">
                <input
                    type="checkbox"
                    id="enabledByDefault"
                    name="enabledByDefault"
                    checked={enabledByDefault}
                    className="h-4 w-4 rounded-md border-0 px-3.5 py-2"
                    onChange={(event) => {setEnabledByDefault(event.target.checked)}}
                />
                <label htmlFor="enabledByDefault" className="ml-2">
                    Timeout standardmäßig aktiviert
                </label>
            </div>
            <div className="flex items-center mt-4">
                <input
                    type="checkbox"
                    id="soundEnabled"
                    name="soundEnabled"
                    checked={soundEnabled}
                    className="h-4 w-4 rounded-md border-0 px-3.5 py-2"
                    onChange={(event) => {setSoundEnabled(event.target.checked)}}
                />
                <label htmlFor="soundEnabled" className="ml-2">
                    Ton abspielen, wenn der Timer abläuft
                </label>
            </div>
            {showHelp && (
            <div
                className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center flex-col"
                onClick={() => setShowHelp(false)}
            >
                <div
                    className="bg-white p-4 rounded shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 max-h-full overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-lg font-bold">Über automatische Timeouts</h2>
                    <p>
                        Warten deine Freunde immer bis zum Refrain, um den Songtitel zu bestimmen, selbst wenn es ewig dauert?<br />
                        Stapeln sich deine <span className="font-bold"><span className="text-indigo-500">Tune</span>Quest Tokens</span>, weil du einfach zu gut bist bei <span className="font-bold"><span className="text-indigo-500">Tune</span>Quest</span>?<br />
                        Mit automatischen Timeouts kannst du die Wiedergabe nach einer bestimmten Zeit automatisch stoppen!
                        Ein Klick auf den Button startet oder stoppt den Timer, je nach aktuellem Zustand.<br />
                        Dies ermöglicht lustige Varianten des klassischen <span className="font-bold"><span className="text-indigo-500">Tune</span>Quest</span>-Erlebnisses:
                    </p>
                    <h3 className="mt-2">
                        <span className="font-bold">Variante 1:</span> &quot;Die 30-Sekunden-Regel&quot;
                    </h3>
                    <p>
                        Aktiviere die Option &quot;Timeout standardmäßig aktiviert&quot; und setze den Timer auf einen Wert, der dir gefällt. Der Standardwert sind 30 Sekunden.
                        Die Wiedergabe wird gestoppt, nachdem der Timer abgelaufen ist. Normalerweise ist Panning in dieser Variante nicht erlaubt.
                    </p>
                    <h3 className="mt-2">
                        <span className="font-bold">Variante 2:</span> Weiterhören gegen Einsatz
                    </h3>
                    <p>
                        Gleich wie Variante 1, aber das aktive Team darf einen <span className="font-bold"><span className="text-indigo-500">Tune</span>Quest Token</span> einsetzen, um den Timer auszuschalten, damit sie weiter hören können.
                    </p>
                    <h3 className="mt-2">
                        <span className="font-bold">Variante 3:</span> Erzwingen gegen Einsatz
                    </h3>
                    <p>
                        <span className="font-bold">Deaktiviere</span> die Option &quot;Timeout standardmäßig aktiviert&quot; und setze den Timer auf einen Wert, der dir gefällt. Das <span className="font-bold">gegnerische Team</span> kann einen <span className="font-bold"><span className="text-indigo-500">Tune</span>Quest Token</span> ausgeben, um den Timer <span className="font-bold">einzuschalten</span> und somit die Wiedergabe für das aktive Team nach der angegebenen Zeit zu erzwingen. Natürlich kann die Anzahl der <span className="font-bold"><span className="text-indigo-500">Tune</span>Quest Tokens</span>, die ausgegeben werden müssen, auf zwei oder mehr festgelegt werden, wenn du das möchtest.
                    </p>
                    <button
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                        onClick={() => setShowHelp(false)}
                    >
                        Schließen
                    </button>
                </div>
            </div>)}
        </div>
    );
};

export default TriggeredTimeout;
