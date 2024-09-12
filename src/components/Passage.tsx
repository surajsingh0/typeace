interface Props {
    paragraph: string;
    handleAddRef: (key: number, ref: HTMLSpanElement | null) => void;
    started: boolean;
    dark: boolean;
}

const Passage = ({ paragraph, handleAddRef, started, dark }: Props, {}) => {
    return (
        <p
            className={`text-xl w-1/2 ${
                started ? "text-slate-400 font-bold" : ""
            } ${dark ? "text-slate-200" : ""}
            }`}
        >
            {paragraph.split("").map((letter, index) => (
                <span key={index} ref={(e) => handleAddRef(index, e)}>
                    {letter}
                </span>
            ))}
        </p>
    );
};

export default Passage;
