import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { ReactTyped } from "react-typed";
import NavBar from "./components/NavBar";
import styles from "./App.module.css";
import background from "./background.jpg";
function App() {
  const [shrinkTitle, setShrinkTitle] = useState(false);
  const [on, setOn] = useState(true);
  const timeToShrink = 5000;
  useEffect(() => {
    const timer = setTimeout(() => {
      setShrinkTitle(true);
    }, timeToShrink);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setOn(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const shouldScrolling = scrollTop > 0;

      if (shouldScrolling !== scrolling) {
        setScrolling(shouldScrolling);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolling]);
  return (
    <>
      {on && (
        <main className={styles.container}>
          <div className={styles.textOverlay}>
            <ReactTyped
              className={styles.title}
              strings={["STAR    WARS    PLANETS"]}
              typeSpeed={155}
            />
          </div>
        </main>
      )}
      {!on && (
        <div
          className={`fixed bg-white rounded-xl shadow-md box-border h-16 min-w-[90vw] top-6 left-14 transition-all ${
            scrolling
              ? "opacity-60 transform -translate-y-10"
              : "opacity-100 transform translate-y-0"
          }`}
        >
          <NavBar />
        </div>
      )}
    </>
  );
}

export default App;
