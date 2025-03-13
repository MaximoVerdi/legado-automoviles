import React, { useState, useEffect } from 'react';
import "./cars-stock-section.css"

const CarsStockSection = () => {
  const [condition, setCondition] = useState('all');
  const [brand, setBrand] = useState('all');
  const [mileageOptions, setMileageOptions] = useState({
    '0': false,
    '40000': false,
    '75000': false,
    '100000': false,
    '300000': false,
  });
  const [minMileage, setMinMileage] = useState('');
  const [maxMileage, setMaxMileage] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar los autos desde el archivo JSON
  useEffect(() => {
    fetch('../data.json') // Ruta al archivo JSON en la carpeta public
      .then((response) => response.json())
      .then((data) => {
        setCars(data);
        setFilteredCars(data); // Inicialmente, mostrar todos los autos
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error cargando los autos:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    calculateMileageResults();
  }, [cars, filteredCars]); // Ejecutar cuando cambien los autos o los autos filtrados

  const handleConditionChange = (e) => {
    setCondition(e.target.value);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  const handleMileageOptionChange = (e) => {
    const { value, checked } = e.target;
    setMileageOptions({
      ...mileageOptions,
      [value]: checked,
    });
  };

  const handleMinMileageChange = (e) => {
    setMinMileage(e.target.value);
  };

  const handleMaxMileageChange = (e) => {
    setMaxMileage(e.target.value);
  };

  const calculateMileageResults = () => {
    const mileageRanges = [
      { min: 0, max: 0, elementId: 'result-0' },
      { min: 0, max: 40000, elementId: 'result-1' },
      { min: 40000, max: 75000, elementId: 'result-2' },
      { min: 75000, max: 100000, elementId: 'result-3' },
      { min: 100000, max: Infinity, elementId: 'result-4' },
    ];

    const mileageArray = cars.map((car) => car.mileage);

    mileageRanges.forEach((range) => {
      const count = mileageArray.filter(
        (mileage) => mileage >= range.min && mileage <= range.max
      ).length;
      const resultElement = document.getElementById(range.elementId);
      if (resultElement) {
        resultElement.textContent = count;
      }
    });
  };

  const applyFilters = () => {
    const minMileageValue = minMileage ? parseInt(minMileage, 10) : 0;
    const maxMileageValue = maxMileage ? parseInt(maxMileage, 10) : Infinity;

    const filtered = cars.filter((car) => {
      let showCar = true;

      // Filtro por estado
      if (condition !== 'all' && car.condition !== condition) {
        showCar = false;
      }

      // Filtro por marca
      if (brand !== 'all' && car.brand !== brand) {
        showCar = false;
      }

      // Filtro por kilometraje (opciones predefinidas)
      const selectedMileageOptions = Object.entries(mileageOptions)
        .filter(([_, checked]) => checked)
        .map(([value]) => parseInt(value, 10));

      if (selectedMileageOptions.length > 0) {
        let mileageMatch = false;
        selectedMileageOptions.forEach((value) => {
          switch (value) {
            case 0:
              if (car.mileage === 0) mileageMatch = true;
              break;
            case 40000:
              if (car.mileage > 0 && car.mileage <= 40000) mileageMatch = true;
              break;
            case 75000:
              if (car.mileage > 40000 && car.mileage <= 75000) mileageMatch = true;
              break;
            case 100000:
              if (car.mileage > 75000 && car.mileage <= 100000) mileageMatch = true;
              break;
            case 300000:
              if (car.mileage > 100000) mileageMatch = true;
              break;
            default:
              break;
          }
        });
        if (!mileageMatch) showCar = false;
      }

      // Filtro por rango de kilometraje
      if (car.mileage < minMileageValue || car.mileage > maxMileageValue) {
        showCar = false;
      }

      return showCar;
    });

    setFilteredCars(filtered);
    calculateMileageResults();
  };

  const clearFilters = () => {
    setCondition('all');
    setBrand('all');
    setMileageOptions({
      '0': false,
      '40000': false,
      '75000': false,
      '100000': false,
      '300000': false,
    });
    setMinMileage('');
    setMaxMileage('');
    setFilteredCars(cars);
    calculateMileageResults();
  };

  if (loading) {
    return <p>Cargando autos...</p>;
  }

  return (
    <>
    <div className='stock-title'>
        <h1>Encontrá tu próximo auto usado en nuestro catálogo</h1>
    </div>
    <div className='stock-page'>
        <section id="stock" className="stock-section">

          <div className="filter-container">
            <div className="filter-menu">
              <h3>Filtrar por Estado</h3>
              <select id="condition-filter" value={condition} onChange={handleConditionChange}>
                <option value="all">Todos</option>
                <option value="usado">Usados</option>
                <option value="new">Nuevos</option>
              </select>
            </div>
            <div className="filter-menu">
              <h3>Filtrar por Marca</h3>
              <select id="brand-filter" value={brand} onChange={handleBrandChange}>
                <option value="all">Todas</option>
                <option value="ford">Ford</option>
                <option value="fiat">Fiat</option>
                <option value="chevrolet">Chevrolet</option>
                <option value="peugeot">Peugeot</option>
                <option value="bmw">Bmw</option>
                <option value="honda">Honda</option>
                <option value="volkswagen">Volkswagen</option>
                <option value="renault">Renault</option>
              </select>
            </div>
            <div className="filter-menu">
              <h3>Kilómetros</h3>
              <div className="mileage-options">
                {Object.entries(mileageOptions).map(([value, checked]) => (
                    <label key={value}>
                        <input
                          type="checkbox"
                          name="mileage-option"
                          value={value}
                          checked={checked}
                          onChange={handleMileageOptionChange}
                          />
                        {value === '0' ? (
                            <>0 km(<span id="result-0">0</span>)</>
                        ) : value === '40000' ? (
                            <>0 a 40,000 km(<span id="result-1">0</span>)</>
                        ) : value === '75000' ? (
                            <>40,000 a 75,000 km(<span id="result-2">0</span>)</>
                        ) : value === '100000' ? (
                            <>75,000 a 100,000 km(<span id="result-3">0</span>)</>
                        ) : (
                            <>100,000 km o más(<span id="result-4">0</span>)</>
                        )}
                    </label>
                ))}
              </div>
              <input
                min="0"
                type="number"
                id="min-mileage"
                placeholder="Mínimo"
                value={minMileage}
                onChange={handleMinMileageChange}
                />
              <input
                min="0"
                type="number"
                id="max-mileage"
                placeholder="Máximo"
                value={maxMileage}
                onChange={handleMaxMileageChange}
                />
              <button id="filter-button" onClick={applyFilters}>
                Filtrar
              </button>
              <button id="clear-filters-button" onClick={clearFilters}>
                Limpiar Filtros
              </button>
            </div>
          </div>

        </section>
        <div className="cars-container">

                {(filteredCars.length > 0 ? filteredCars : cars).map((car) => (
                    <a
                    key={car.id}
                    href="#"
                    className="car-card"
                    data-condition={car.condition}
                    data-brand={car.brand}
                    data-mileage={car.mileage}
                    >
                    <img src={car.image} alt={`Auto ${car.name} en venta`} />
                    <h4>{car.name}</h4>
                    <p className="car-card__price">${car.price}</p>
                    <p>
                      {car.year} | {car.mileage} km
                    </p>
                    <p>{car.location}</p>
                  </a>
                ))}
            </div>
    </div>
</>
  );
};

export { CarsStockSection };