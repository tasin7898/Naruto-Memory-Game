import { useState, useEffect } from "react";

function Cards() {
  const [cards, setCards] = useState([]);
  const [isClicked, setIsClicked] = useState(new Set());
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("https://api.jikan.moe/v4/anime/20/characters");
        if (!res.ok) throw new Error("Failed to fetch characters");
        const json = await res.json();
        const charCards = extractMostPopularChars(json);
        setCards(charCards);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCards();
  }, []);
  const shuffleCards = (cards) => {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  };
  const extractMostPopularChars = (json) => {
    const top20 = json.data
      .sort((a, b) => (b.favorites || 0) - (a.favorites || 0))
      .slice(0, 20);
    return shuffleCards(top20).map((char) => ({
      id: char.character.mal_id,
      name: char.character.name.split(", ").reverse().join(" "),
      image: char.character.images?.jpg?.image_url,
      favourites: char.favorites || 0,
    }));
  };
  const handleClick = (id) => {
    if (!isClicked.has(id)) {
      setIsClicked((prev) => {
        const newSet = new Set(prev);
        newSet.add(id);
        return newSet;
      });
      setCurrentScore(prev => prev + 1);
      if(currentScore > bestScore) {
        setBestScore(currentScore);
      }  
    }
    else {      
      setCurrentScore(0);
    }
  };
  if (isLoading) return <div>Cards Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="cards">
      {cards.map((card) => (
        <div key={card.id} onClick={() => handleClick(card.id)}>
          <img src={card.image} alt={card.name} />
          <p>{card.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Cards;
