import React, { useState, useEffect } from "react";
import warrior from "../img/warrior.jpg";
const Planets = () => {
  const [planets, setPlanets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [residents, setResidents] = useState([]);
  const [showResidents, setShowResidents] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  useEffect(() => {
    fetchPlanets(currentPage);
  }, [currentPage]);

  const fetchPlanets = async (page) => {
    const response = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
    const data = await response.json();
    console.log(data);
    setPlanets(data.results);
  };
  const fetchResidents = async (planet) => {
    const residentsData = [];
    for (const residentUrl of planet.residents) {
      const response = await fetch(residentUrl);
      const data = await response.json();
      residentsData.push(data);
    }
    console.log(residentsData);
    setResidents(residentsData);
  };

  const handleShowResidents = (planet) => {
    setSelectedPlanet(planet);
    fetchResidents(planet);
    setShowResidents(!showResidents);
    scrollToCards();
  };
  const scrollToCards = () => {
    window.scrollTo({
      top: 1500,
      behavior: "smooth",
    });
  };
  const handlePreviousPage = async () => {
    if (currentPage > 1) {
      const response = await fetch(
        `https://swapi.dev/api/planets/?page=${currentPage}`
      );
      const data = await response.json();
      console.log(data);
      setPlanets(data.results);
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = async () => {
    if (currentPage < 7) {
      const response = await fetch(
        `https://swapi.dev/api/planets/?page=${currentPage}`
      );
      const data = await response.json();
      console.log(data);
      setPlanets(data.results);
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div></div>

      <div className="break-before-column flex flex-col items-center justify-center gap-4">
        <h1 className="btn btn-ghost text-5xl text-white mb-10 font-bold">
          Planets Directory
        </h1>
        <div className="grid grid-cols-5 gap-4 m-1">
          {planets.map((planet) => (
            <div className="card w-60 glass">
              <div className="card-body">
                <h2 className="card-title">{planet.name}</h2>
                <p>Climate: {planet.climate}</p>
                <p>Population: {planet.population}</p>
                <p>Terrain: {planet.terrain}</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      handleShowResidents(planet);
                    }}
                  >
                    {showResidents && selectedPlanet == planet
                      ? "Hide Residents"
                      : "Show Residents"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="join p-2 mb-10">
          <button
            className="join-item text-2xl btn"
            onClick={handlePreviousPage}
          >
            «
          </button>
          <button className="join-item text-2xl btn">Page {currentPage}</button>
          <button className="join-item text-2xl btn" onClick={handleNextPage}>
            »
          </button>
        </div>
        <div className="flex items-start justify-center h-screen w-full ">
          <div className="flex flex-col p-6 bg-neutral-900  min-h-[80vh] min-w-[90vw] rounded-xl  items-stretch gap-8">
            <div className="text-2xl btn btn-ghost text-white font-extrabold m-4 flex justify-center">
              Residents of {selectedPlanet?.name}
            </div>
            <div className="min-w-[90vw] carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box">
              {residents.map((resident) => (
                <div className="carousel-item">
                  <div className="card w-80 glass">
                    <figure>
                      <img src={warrior} alt="car!" />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{resident.name}</h2>
                      <p>Height: {resident.height}</p>
                      <p>Mass: {resident.mass}</p>
                      <p>Gender: {resident.gender}</p>
                      <div className="card-actions justify-end">
                        <button className="btn btn-primary">Know More!</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Planets;
