import paragraphs from "./assets/paragraphs.json";

export const getRandomParagraph = async () => {
    const paragraph =
        paragraphs.data[Math.floor(Math.random() * paragraphs.data.length)]
            .paragraph;

    return paragraph;
};

// UTILITY FUNCTIONS
export const calculateWPM = (
    wordCount: number,
    timeInSeconds: number
): number => {
    if (timeInSeconds <= 0) {
        throw new Error("Time must be greater than zero.");
    }

    const timeInMinutes = timeInSeconds / 60;
    return wordCount / timeInMinutes;
};

export const calculateTimeDifferenceInMinutes = (
    startTime: string,
    endTime: string
): number => {
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (end < start) {
        throw new Error("End time must be after start time.");
    }

    const timeDifferenceInMilliseconds = end.getTime() - start.getTime();
    const timeDifferenceInMinutes = timeDifferenceInMilliseconds / (1000 * 60);

    return timeDifferenceInMinutes;
};
