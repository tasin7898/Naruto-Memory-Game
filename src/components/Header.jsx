function Header() {
  return (
    <header>
      <h1>Naruto<strong>Memory Game</strong></h1>
      <div className="scoreboard">
        <div className="current-score">Current Score: </div>
        <div className="best-score"> Best Score: </div>
      </div>
    </header>
  );
}

export default Header;
