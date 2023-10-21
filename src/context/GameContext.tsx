import { createContext, useEffect, useState } from "react";
interface Game {
    cards: IDataCard[];
    pickCard: (data: IDataCard) => void;

}
export const GameContext = createContext<Game>({
    cards: [],
    pickCard: function (_data: IDataCard): void {
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

export const Game = ({ children }: { children: React.ReactNode }) => {
    const [cards, setCards] = useState<IDataCard[]>(() => {
        const cards = srcs.map((src, index) => ({ index: index, id: index, src: src, show: false, found: false }))

        cards.forEach(card => {
            cards.push({ ...card });
        })

        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }

        return cards
    })

    const [firstCard, setFirstCard] = useState<IDataCard | undefined>(undefined);
    const [secondCard, setSecondCard] = useState<IDataCard | undefined>(undefined);
    const [found, setFound] = useState(Boolean);

    const pickCard = (data: IDataCard) => {
        if (data.found) return

        if (!firstCard) {
            setFirstCard(data);
            return
        }

        if (firstCard && !secondCard) {
            if (firstCard.index === data.index) return
            setSecondCard(data);
            return
        } else {
            if (secondCard) {
                const _cards = [...cards];
                _cards[firstCard.index] = { ...firstCard, show: false };
                _cards[secondCard.index] = { ...secondCard, show: false };

                setCards(_cards);

                setFirstCard(data);
                setSecondCard(undefined);
                return
            }
        }
    }

    useEffect(() => {
        console.log("firstCard", firstCard);
        if (firstCard) {
            const _cards = [...cards];
            _cards[firstCard.index].show = true;
            setCards(_cards);
        }
    }, [firstCard])
    
    useEffect(() => {
        console.log("secondCard", secondCard);
        if (secondCard) {
            const _cards = [...cards];
            _cards[secondCard.index].show = true;

            if (firstCard && firstCard?.id === secondCard?.id) {
                _cards[firstCard.index] = { ...firstCard, found: true };
                _cards[secondCard.index] = { ...secondCard, found: true };
            };

            setCards(_cards);
        }
    }, [secondCard])

    const compare = () => {
        return firstCard?.id === secondCard?.id
    }


    useEffect(()=>{
        console.log(cards)
    }, [cards])

    return (
        <GameContext.Provider value={{ cards, pickCard }}>
            {children}
        </GameContext.Provider>
    )
}