import React, { useState } from "react";

const CropPrice = () => {
  const [cropName, setCropName] = useState("");
  const [cropPrice, setCropPrice] = useState(null);

  const handleCheckCropPrice = async () => {
    if (!cropName) return alert("Enter a crop name!");

    try {
      const response = await fetch(`http://localhost:5000/api/crop-price/${cropName.toLowerCase()}`);
      const data = await response.json();
      setCropPrice(data.currentPrice ? data : null);
    } catch (error) {
      alert("Error fetching crop price.");
    }
  };

  return (
    <div className="container mt-4">
      <h3>💰 Crop Price Prediction</h3>
      <input
        type="text"
        className="form-control mt-2"
        placeholder="Enter crop name"
        value={cropName}
        onChange={(e) => setCropName(e.target.value)}
      />
      <button className="btn btn-success mt-3" onClick={handleCheckCropPrice}>Check Price</button>
      {cropPrice && <div className="card mt-3 p-3">
        <h5>🌾 {cropPrice.crop.toUpperCase()}</h5>
        <p>📊 Current Price: <strong>{cropPrice.currentPrice} {cropPrice.unit}</strong></p>
        <p>🔮 Predicted Price: <strong>{cropPrice.predictedPrice} {cropPrice.unit}</strong></p>
      </div>}
    </div>
  );
};

export default CropPrice;
