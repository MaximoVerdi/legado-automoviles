import React, { useState, useEffect } from 'react';
import "./cars-stock-section.css";
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import AddVehicleForm from './addVehicleForm';
import EditVehicleForm from './EditVehicleForm/editVehicleForm';
import { useAuth } from "../../context/authContext"

const CarsStockSection = () => {
  const { user, isAdmin } = useAuth();
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
  const [editingCar, setEditingCar] = useState(null);


  // Cargar los autos desde Firebase con actualización en tiempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "vehicles"), (querySnapshot) => {
      const carsData = [];
      querySnapshot.forEach((doc) => {
        carsData.push({ 
          id: doc.id, 
          brand: doc.data().brand || '',
          model: doc.data().model || '',
          year: doc.data().year || 0,
          price: doc.data().price || 0,
          mileage: doc.data().mileage || 0,
          condition: doc.data().condition || 'usado',
          imageUrls: doc.data().imageUrls || [],
          location: doc.data().location || '',
          description: doc.data().description || '',
          features: doc.data().features || [],
          transmission: doc.data().transmission || 'automática',
          fuelType: doc.data().fuelType || 'nafta'
        });
      });
      setCars(carsData);
      setFilteredCars(carsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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

  const applyFilters = () => {
    const minMileageValue = minMileage ? parseInt(minMileage, 10) : 0;
    const maxMileageValue = maxMileage ? parseInt(maxMileage, 10) : Infinity;

    const filtered = cars.filter((car) => {
      // Filtro por estado
      if (condition !== 'all' && car.condition !== condition) {
        return false;
      }

      // Filtro por marca
      if (brand !== 'all' && car.brand !== brand) {
        return false;
      }

      // Filtro por kilometraje (opciones predefinidas)
      const selectedMileageOptions = Object.entries(mileageOptions)
        .filter(([_, checked]) => checked)
        .map(([value]) => parseInt(value, 10));

      if (selectedMileageOptions.length > 0) {
        let mileageMatch = false;
        selectedMileageOptions.forEach((value) => {
          if (value === 0 && car.mileage === 0) mileageMatch = true;
          if (value === 40000 && car.mileage > 0 && car.mileage <= 40000) mileageMatch = true;
          if (value === 75000 && car.mileage > 40000 && car.mileage <= 75000) mileageMatch = true;
          if (value === 100000 && car.mileage > 75000 && car.mileage <= 100000) mileageMatch = true;
          if (value === 300000 && car.mileage > 100000) mileageMatch = true;
        });
        if (!mileageMatch) return false;
      }

      // Filtro por rango de kilometraje
      if (car.mileage < minMileageValue || car.mileage > maxMileageValue) {
        return false;
      }

      return true;
    });

    setFilteredCars(filtered);
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
  };

  
  // Efectos para edicion de vehículos
  
  const handleDeleteCar = async (cardId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este vehículo?")) { 
      try {
        await deleteDoc(doc(db, "vehicles", cardId));
      } catch (error) {
        console.error("Error al eliminar el vehículo:", error);
        alert(`Error al eliminar el vehículo: ${error.message}`);
      }
    }
  }
  
  const handleEditCar = (car) => {
    setEditingCar(car);
  };
  
  const handleCancelEdit = () => {
    setEditingCar(null);
  };
  
  const handleUpdateCar = () => {
    setEditingCar(null);
  };
  
  if (loading) {
    return <div className="loading-container">Cargando autos...</div>;
  }

  console.log("User object:", user);
console.log("isAdmin value:", isAdmin);
console.log("Editing car state:", editingCar);
console.log("Should show AddForm:", isAdmin && !editingCar);

  
  return (
    <>

      {isAdmin && !editingCar && <AddVehicleForm />}
        {isAdmin && editingCar && (
          <EditVehicleForm 
            carData={editingCar} 
            onCancel={handleCancelEdit}
            onSuccess={handleUpdateCar}
          />
        )}
      <div className='stock-title'>
        <h1>Encontrá tu próximo auto en nuestro catálogo</h1>
      </div>
      <div className='stock-page'>
        <section className="stock-section">
          <div className="filter-container">
            <div className='filter-menu-container'>
              <div className="filter-menu">
                <h3>Filtrar por Estado</h3>
                <select value={condition} onChange={handleConditionChange}>
                  <option value="all">Todos</option>
                  <option value="usado">Usados</option>
                  <option value="nuevo">Nuevos</option>
                  <option value="seminuevo">Seminuevos</option>
                </select>
              </div>
              <div className="filter-menu">
                <h3>Filtrar por Marca</h3>
                <select value={brand} onChange={handleBrandChange}>
                  <option value="all">Todas</option>
                  <option value="ford">Ford</option>
                  <option value="fiat">Fiat</option>
                  <option value="chevrolet">Chevrolet</option>
                  <option value="peugeot">Peugeot</option>
                  <option value="bmw">BMW</option>
                  <option value="honda">Honda</option>
                  <option value="volkswagen">Volkswagen</option>
                  <option value="renault">Renault</option>
                </select>
              </div>
            </div>
            <div className="filter-menu">
              <h3>Kilómetros</h3>
              <div className="mileage-options">
                {Object.entries(mileageOptions).map(([value, checked]) => (
                  <label key={value}>
                    <input
                      type="checkbox"
                      value={value}
                      checked={checked}
                      onChange={handleMileageOptionChange}
                    />
                    {value === '0' && '0 km'}
                    {value === '40000' && '0 a 40,000 km'}
                    {value === '75000' && '40,000 a 75,000 km'}
                    {value === '100000' && '75,000 a 100,000 km'}
                    {value === '300000' && '100,000 km o más'}
                  </label>
                ))}
              </div>
              <div className="mileage-range">
                <input
                  type="number"
                  placeholder="Mínimo"
                  value={minMileage}
                  onChange={handleMinMileageChange}
                  min="0"
                />
                <input
                  type="number"
                  placeholder="Máximo"
                  value={maxMileage}
                  onChange={handleMaxMileageChange}
                  min="0"
                />
              </div>
              <div className="filter-buttons">
                <button onClick={applyFilters}>Filtrar</button>
                <button className='clear-filters-button' onClick={clearFilters}>Limpiar Filtros</button>
              </div>
            </div>
          </div>
        </section>

        <div className="cars-container">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <div key={car.id} className="car-card">
                {car.imageUrls?.length > 0 ? (
                  <img 
                    src={car.imageUrls[0]} 
                    alt={`${car.brand} ${car.model}`}
                    onError={(e) => {
                      e.target.src = '/placeholder-car.jpg';
                    }}
                  />
                ) : (
                  <img src="/placeholder-car.jpg" alt="Auto sin imagen" />
                )}
                <div className="car-info">
                  <h3>{car.brand} {car.model} {isAdmin && (
                    <div className="admin-actions">
                      <button onClick={() => handleEditCar(car)}>Editar</button>
                      <button onClick={() => handleDeleteCar(car.id)}>Eliminar</button>
                    </div>
                  )}</h3>
                  <p className="car-price">US${car.price.toLocaleString('es-AR')}</p>
                  <p className='car-year'>{car.year} | {car.mileage.toLocaleString('es-AR')} km</p>
                  <p>{car.location}</p>

                  
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No se encontraron vehículos con los filtros seleccionados</p>
              <button onClick={clearFilters}>Mostrar todos</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};


export { CarsStockSection };