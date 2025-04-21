import { useState, useEffect } from "react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import ImageUploader from "../imageUploader";
import "../addVehicleForm.css";

const EditVehicleForm = ({ carData, onCancel, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [featureInput, setFeatureInput] = useState("");
    const [formData, setFormData] = useState({
        brand: "",
        model: "",
        year: "",
        price: "",
        mileage: "",
        condition: "usado",
        transmission: "automática",
        fuelType: "nafta",
        location: "",
        description: "",
        features: [],
        imageUrls: []
    });

    useEffect(() => {
        if (carData) {
            setFormData({
                brand: carData.brand || "",
                model: carData.model || "",
                year: carData.year || "",
                price: carData.price || "",
                mileage: carData.mileage || "",
                condition: carData.condition || "usado",
                transmission: carData.transmission || "automática",
                fuelType: carData.fuelType || "nafta",
                location: carData.location || "",
                description: carData.description || "",
                features: carData.features || [],
                imageUrls: carData.imageUrls || []
            });
        }
    }, [carData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (url) => {
        setFormData(prev => ({
            ...prev,
            imageUrls: [...prev.imageUrls, url]
        }));
    };

    const addFeature = () => {
        if (featureInput && !formData.features.includes(featureInput)) {
            setFormData(prev => ({
                ...prev,
                features: [...prev.features, featureInput]
            }));
            setFeatureInput("");
        }
    };

    const removeFeature = (feature) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter(f => f !== feature)
        }));
    };

    const removeImage = (url) => {
        setFormData(prev => ({
            ...prev,
            imageUrls: prev.imageUrls.filter(img => img !== url)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (formData.imageUrls.length === 0) {
            alert("Debe haber al menos una imagen");
            return;
        }
    
        try {
            setLoading(true);
    
            const vehicleData = {
                brand: String(formData.brand || ""),
                model: String(formData.model || ""),
                year: formData.year ? parseInt(formData.year) : 0,
                price: formData.price ? parseFloat(formData.price) : 0,
                mileage: formData.mileage ? parseInt(formData.mileage) : 0,
                condition: String(formData.condition || "usado"),
                transmission: String(formData.transmission || "automática"),
                fuelType: String(formData.fuelType || "nafta"),
                location: String(formData.location || ""),
                description: String(formData.description || ""),
                features: Array.isArray(formData.features) ? formData.features : [],
                imageUrls: Array.isArray(formData.imageUrls) ? formData.imageUrls : [],
                updatedAt: serverTimestamp()
            };
    
            await updateDoc(doc(db, "vehicles", carData.id), vehicleData);
            alert("¡Vehículo actualizado con éxito!");
            onSuccess();
        } catch (error) {
            console.error("Error al actualizar:", error);
            alert(`Error al actualizar: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="vehicle-form-container">
            <h2>Editar Vehículo</h2>
            <form onSubmit={handleSubmit}>
            <div className="vehicle-form-container">
      <h2>Agregar Nuevo Vehículo</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-section">  
          <h3>Información Básica</h3>
          <div className="form-group">
            <label>Marca*</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Modelo*</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Año*</label>
              <input
                type="number"
                name="year"
                min="1900"
                max={new Date().getFullYear() + 1}
                value={formData.year}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Precio (USD)*</label>
              <input
                type="number"
                name="price"
                min="0"
                step="100"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Kilometraje</label>
              <input
                type="number"
                name="mileage"
                min="0"
                value={formData.mileage}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Condición</label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
              >
                <option value="usado">Usado</option>
                <option value="nuevo">Nuevo</option>
                <option value="seminuevo">Seminuevo</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Especificaciones</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Transmisión</label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
              >
                <option value="automática">Automática</option>
                <option value="manual">Manual</option>
                <option value="semiautomática">Semiautomática</option>
              </select>
            </div>

            <div className="form-group">
              <label>Combustible</label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
              >
                <option value="nafta">Nafta</option>
                <option value="diésel">Diésel</option>
                <option value="híbrido">Híbrido</option>
                <option value="eléctrico">Eléctrico</option>
                <option value="gnc">GNC</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Ubicación</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Descripción y Características</h3>
          <div className="form-group">
            <label>Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Características</label>
            <div className="features-input">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="Ej: Aire acondicionado, cámara de reversa"
              />
              <button className="add-feature-button" type="button" onClick={addFeature}>Agregar</button>
            </div>
            <div className="features-tags">
              {formData.features.map((feature, index) => (
                <span key={index} className="feature-tag">
                  {feature}
                  <button type="button" onClick={() => removeFeature(feature)}>
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Imágenes*</h3>
          <ImageUploader onUpload={handleImageUpload} />
            <div className="image-preview">
              {formData.imageUrls.map((url, index) => (
                <div key={url} className="image-thumbnail"> {/* Usamos url como key */}
                  <img src={url} alt={`Vehículo ${index + 1}`} />
                  <button 
                    type="button" 
                    onClick={() => removeImage(url)}
                    aria-label="Eliminar imagen"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
        </div>
      </form>
    </div>

                
                <div className="form-actions">
                    <button type="button" onClick={onCancel}>
                        Cancelar
                    </button>
                    <button type="submit" disabled={loading}>
                        {loading ? "Actualizando..." : "Actualizar Vehículo"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditVehicleForm;