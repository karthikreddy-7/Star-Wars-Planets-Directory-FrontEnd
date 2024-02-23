import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { ReactTyped } from "react-typed";
import NavBar from "./components/NavBar";
import styles from "./App.module.css";
import stars from "./img/stars.jpg";
import icon from "./img/icon.png";
import Planets from "./components/planets";
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
        <>
          <div
            style={{
              backgroundSize: "contain",
              minHeight: "100vh",
              backdropFilter: "blur(5px)",
            }}
          >
            <div
              className={`fixed bg-white rounded-xl shadow-md box-border h-16 min-w-[90vw] top-6 left-14 transition-all ${
                scrolling
                  ? "opacity-60 transform -translate-y-10"
                  : "opacity-100 transform translate-y-0"
              }`}
            >
              <NavBar />
            </div>
            <div className="flex items-center justify-center">
              <div className="mt-24 flex sm:flex-wrap items-center justify-center p-2 gap-8 ">
                <p className=" text-white text-2xl bg-black rounded-xl font-extrabold w-96">
                  Star Wars is a space opera media franchise created by George
                  Lucas. It began with the 1977 film Star Wars: A New Hope and
                  has since become a worldwide pop culture phenomenon.
                </p>
                <img className="w-100 rounded-xl" src={icon} />
              </div>
            </div>
            <hr class="h-px mt-24 my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          </div>
          <Planets />
        </>
      )}
    </>
  );
}

export default App;
