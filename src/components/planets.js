import React, { useState, useEffect } from "react";
const Planets = () => {
  const [planets, setPlanets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [residents, setResidents] = useState([]);
  useEffect(() => {
    fetchPlanets(currentPage);
  }, [currentPage]);

  const fetchPlanets = async (page) => {
    const response = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
    const data = await response.json();
    console.log(data);
    setPlanets(data.results);
  };
  return (
    <>
      <div></div>
      <div className="App">
        <h1>Planets Directory</h1>
        <ul>
          {planets.map((planet) => (
            <div className="flex gap-10">
              <h2>Name: {planet.name}</h2>
              <p>Climate: {planet.climate}</p>
              <p>Population: {planet.population}</p>
              <p>Terrain: {planet.terrain}</p>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Planets;
