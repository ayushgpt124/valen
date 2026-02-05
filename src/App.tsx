import { useState, useCallback, useRef, useEffect } from "react";
import "./App.css";

export default function Page() {
  const [yesPressed, setYesPressed] = useState(false);
  const [noPosition, setNoPosition] = useState<{ top: number; left: number } | null>(null);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const heartIdRef = useRef(0);

  const moveNoButton = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const buttonWidth = 120;
    const buttonHeight = 50;
    const padding = 20;

    const maxX = rect.width - buttonWidth - padding;
    const maxY = rect.height - buttonHeight - padding;

    const newLeft = Math.max(padding, Math.random() * maxX);
    const newTop = Math.max(padding, Math.random() * maxY);

    setNoPosition({ top: newTop, left: newLeft });
  }, []);

  const handleYesClick = () => {
    setYesPressed(true);
  };

  useEffect(() => {
    if (!yesPressed) return;
    const interval = setInterval(() => {
      heartIdRef.current += 1;
      const newHeart = {
        id: heartIdRef.current,
        x: Math.random() * 100,
        y: Math.random() * 100,
      };
      setHearts((prev) => [...prev.slice(-20), newHeart]);
    }, 400);
    return () => clearInterval(interval);
  }, [yesPressed]);

  return (
    <div ref={containerRef} className="page-container">
      {yesPressed ? (
        <div className="yes-screen">
          {hearts.map((heart) => (
            <span
              key={heart.id}
              className="floating-heart"
              style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
            >
              &#10084;
            </span>
          ))}
          <div className="yes-content">
            <div className="heart-burst">💕🎉✨</div>
            <h1 className="romantic-title">She Said Yes! 🥰💍</h1>
            <p className="romantic-text">
              I knew you'd say yes! Saturday is going to be the most magical day ✨🌹💖
            </p>
            <div className="sparkle-row">
              💃🕺 🥂🍾 💕💫🎶
            </div>
          </div>
        </div>
      ) : (
        <div className="ask-screen">
          <div className="question-card">
            <div className="rose-emoji">&#127801;</div>
            <h1 className="question-title">
              Will you go on a date with me this Saturday?
            </h1>
            <p className="question-sub">I promise it'll be worth it &#128522;</p>
            <div className="button-row">
              <button className="yes-button" onClick={handleYesClick}>
                Yes &#10084;&#65039;
              </button>
              {!noPosition && (
                <button
                  className="no-button"
                  onMouseEnter={moveNoButton}
                  onTouchStart={moveNoButton}
                  onClick={moveNoButton}
                >
                  No
                </button>
              )}
            </div>
          </div>
          {noPosition && (
            <button
              className="no-button"
              style={{
                position: "absolute",
                top: noPosition.top,
                left: noPosition.left,
                transition: "all 0.2s ease-out",
              }}
              onMouseEnter={moveNoButton}
              onTouchStart={moveNoButton}
              onClick={moveNoButton}
            >
              No
            </button>
          )}
        </div>
      )}
    </div>
  );
}
