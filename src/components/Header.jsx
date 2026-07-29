import "./Header.css";
function Header({ currentScore, bestScore }) {
  return (
    <header>
      <div className="title-score">
        <h1>
          Naruto<strong>Memory Game</strong>
        </h1>
        <div className="scoreboard">
          <div className="current-score">Current Score: {currentScore}</div>
          <div className="best-score"> Best Score: {bestScore}</div>
        </div>
      </div>
      <div className="rule">Score points by clicking on an image only once!</div>
    </header>
  );
}

export default Header;
