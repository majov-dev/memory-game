import { createContext, useEffect, useState } from "react";
interface Game {
    cards: IDataCard[];
    pickCard: (index: number) => void;

}
export const GameContext = createContext<Game>({
    cards: [],
    pickCard: function (_index: number): void {
        throw new Error("Function not implemented.");
    }
});

const srcs = [
    "src/assets/images/pexels-charles-1851164.jpg",
    "src/assets/images/pexels-laura-the-explaura-3608263.jpg",
    "src/assets/images/pexels-roman-odintsov-11760851.jpg",
    "src/assets/images/pexels-roman-odintsov-12715260.jpg",
    "src/assets/images/pexels-taryn-elliott-5146801.jpg",
    "src/assets/images/pexels-till-daling-12461880.jpg",
];

const shuffleArray = (array: any[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};


export const Game = ({ children }: { children: React.ReactNode }) => {
    const [cards, setCards] = useState<IDataCard[]>(() => {
        const cards = srcs.map((src, index) => ({ id: index, src: src, isFlipped: false, found: false }))

        return shuffleArray([...cards, ...cards]);
    })

    const [flippedCardsIndex, setFlippedCardsIndex] = useState<number[]>([]);


    const pickCard = (index: number) => {
        if (cards[index].found) return
        if (flippedCardsIndex.includes(index)) return

        const _cards = [...cards];

        if (flippedCardsIndex.length === 2) {
            _cards[flippedCardsIndex[0]] = { ..._cards[flippedCardsIndex[0]], isFlipped: false };
            _cards[flippedCardsIndex[1]] = { ..._cards[flippedCardsIndex[1]], isFlipped: false };
        }

        _cards[index] = { ..._cards[index], isFlipped: true };
        setCards([..._cards]);

        if (flippedCardsIndex.length === 1) {
            setFlippedCardsIndex([...flippedCardsIndex, index]);
            return
        }


        setFlippedCardsIndex([index]);
    }

    useEffect(() => {
        if (flippedCardsIndex.length === 2) {
            if (cards[flippedCardsIndex[0]].id === cards[flippedCardsIndex[1]].id) {
                const _cards = [...cards];
                _cards[flippedCardsIndex[0]] = { ..._cards[flippedCardsIndex[0]], found: true };
                _cards[flippedCardsIndex[1]] = { ..._cards[flippedCardsIndex[1]], found: true };
                setCards(_cards);
            }
        }
    }, [flippedCardsIndex])

    // useEffect(() => {
    //     console.log("firstCardIndex", firstCardIndex);
    //     console.log("secondCardIndex", secondCardIndex);


    //     console.log("cards[firstCardIndex]", cards[firstCardIndex]);
    //     console.log("cards[secondCardIndex]", cards[secondCardIndex]);


    //     if (cards[firstCardIndex]?.id === cards[secondCardIndex]?.id) {
    //         const _cards = [...cards];
    //         _cards[firstCardIndex] = { ..._cards[firstCardIndex], found: true };
    //         _cards[secondCardIndex] = { ..._cards[secondCardIndex], found: true };
    //         setCards(_cards);
    //     };


    // }, [secondCardIndex])

    useEffect(() => {
        console.log(cards)
    }, [cards])

    return (
        <GameContext.Provider value={{ cards, pickCard }}>
            {children}
        </GameContext.Provider>
    )
}