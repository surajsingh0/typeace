interface Props {
    paragraph: string;
    handleAddRef: (key: number, ref: HTMLSpanElement | null) => void;
    started: boolean;
}

const Passage = ({ paragraph, handleAddRef, started }: Props, {}) => {
    return (
        <p
            className={`text-lg w-1/2 ${
                started ? "text-slate-400 font-bold" : ""
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
