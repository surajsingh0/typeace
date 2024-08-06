import { useEffect, useState, useRef } from "react";
import { IoReload } from "react-icons/io5";
import Passage from "./components/Passage";
import {
    getRandomParagraph,
    calculateWPM,
    calculateTimeDifferenceInMinutes,
    calculateAccuracy,
} from "./resources";

function App() {
    const [paragraph, setParagraph] = useState<string>("");
    const [currentLetter, setCurrentLetter] = useState(0);
    const [wordsTyped, setWordsTyped] = useState(0);
    const [started, setStarted] = useState(false);
    const [restart, setRestart] = useState(false);
    const [time, setTime] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [wrongs, setWrongs] = useState(0);
    const [accuracy, setAccuracy] = useState(0);

    useEffect(() => {
        getRandomParagraph().then((paragraph) => setParagraph(paragraph));
    }, []);

    const lettersRef = useRef({} as Record<number, HTMLSpanElement | null>);

    const handleAddRef = (key: number, ref: HTMLSpanElement | null) => {
        lettersRef.current[key] = ref;
    };

    const getLetter = (index: number): HTMLSpanElement | null => {
        return lettersRef.current[index];
    };

    const handleTyping = (event: any) => {
        let letter = event.key;
        let true_letter = getLetter(currentLetter);

        const allowedCharPattern =
            /^[a-zA-Z.,!?;:(){}[\]'"`~@#$%^&*_\-+=/|\\<> ]$/;

        if (!allowedCharPattern.test(letter)) return;

        if (true_letter?.textContent === letter) {
            true_letter?.classList.add("text-green-500");
            if (true_letter?.textContent === " ") {
                true_letter?.classList.add("bg-green-200");
            }
        } else {
            true_letter?.classList.add("text-red-500");
            if (true_letter?.textContent === " ") {
                true_letter?.classList.add("bg-red-200");
            }
            setWrongs(wrongs + 1);
        }
        setCurrentLetter(currentLetter + 1);

        if (!/^[a-zA-Z]$/.test(true_letter?.textContent || "")) {
            setWordsTyped(wordsTyped + 1);
        }

        if (paragraph.length > 0 && currentLetter + 1 === paragraph.length) {
            setStarted(false);
            setRestart(true);
        }
    };

    const handleStart = () => {
        setStarted(true);
        setTime(Date.now());
    };

    const handleRestart = () => {
        getRandomParagraph().then((paragraph) => setParagraph(paragraph));
        setStarted(false);
        setRestart(false);
        setCurrentLetter(0);
        setWordsTyped(0);
        setWpm(0);
        setWrongs(0);
        setAccuracy(0);
    };

    useEffect(() => {
        if (!started) return;

        window.addEventListener("keydown", handleTyping);
        getLetter(currentLetter)?.classList.add("underline");
        getLetter(currentLetter)?.classList.add("text-blue-500");

        const endTime = Date.now();
        const timeDifferenceInMinutes = calculateTimeDifferenceInMinutes(
            new Date(time).toISOString(),
            new Date(endTime).toISOString()
        );
        const timeDifferenceInSeconds = timeDifferenceInMinutes * 60;
        const wpm = calculateWPM(wordsTyped, timeDifferenceInSeconds);
        setWpm(wpm);

        setAccuracy(calculateAccuracy(currentLetter + 1, wrongs));

        return () => {
            window.removeEventListener("keydown", handleTyping);
            getLetter(currentLetter)?.classList.remove("underline");
            getLetter(currentLetter)?.classList.remove("text-blue-500");
        };
    }, [currentLetter, started]);

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center gap-2 font-mono">
            <div className="flex justify-between items-center w-1/2">
                <div className="flex items-center gap-1">
                    <button
                        onClick={handleStart}
                        disabled={started || restart}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 disabled:bg-gray-300"
                    >
                        Start
                    </button>
                    <IoReload
                        onClick={handleRestart}
                        className="cursor-pointer text-blue-500 hover:text-blue-700 transition-all duration-300"
                        size={24}
                    />
                </div>
                <p
                    className={`text-2xl font-bold flex gap-6 ${
                        !started && !restart
                            ? "text-slate-200"
                            : "text-slate-500"
                    }`}
                >
                    <span>Accuracy: {accuracy.toFixed(2)}%</span>
                    <span>WPM: {wpm.toFixed(0)}</span>
                </p>
            </div>
            <Passage
                paragraph={paragraph}
                handleAddRef={handleAddRef}
                key={paragraph}
                started={started}
            />
        </div>
    );
}

export default App;
