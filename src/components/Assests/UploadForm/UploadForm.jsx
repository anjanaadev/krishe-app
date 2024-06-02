import React, { useState } from 'react';
import './UploadForm.css';

const UploadForm = () => {
  const [formValues, setFormValues] = useState({
    emailId: '',
    temperature: '',
    humidity: '',
    ph: '',
    soilMoisture: '',
    diseaseName: ''
  });
  const [files, setFiles] = useState({
    diseaseImage: null,
    primaryHealthMap: null,
    secondaryHealthMap: null,
    primaryGeoImage: null,
    secondaryGeoImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleFileChange = (field, e) => {
    setFiles({
      ...files,
      [field]: e.target.files[0]
    });
  };
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]); // Extract base64 string
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmitClick = async (e) => {
    e.preventDefault(); // Prevent default form submission


      try {
        const base64Files = await Promise.all(
          Object.values(files).map(file => file ? convertToBase64(file) : null)
        );

        const payload = {
          emailId: formValues.emailId,
          temperature: formValues.temperature,
          humidity: formValues.humidity,
          ph: formValues.ph,
          soilMoisture: formValues.soilMoisture,
          diseaseName: formValues.diseaseName,
          diseaseImage: base64Files[0],
          primaryHealthMap: base64Files[1],
          secondaryHealthMap: base64Files[2],
          primaryGeoImage: base64Files[3],
          secondaryGeoImage: base64Files[4],
        };

      const response = await fetch('http://35.154.176.67:8080/ihfc/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Response from backend:', data);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  return (
    <div className='dashboard-container'>
      <header>
        <img src="vtIndia.png" alt="Company Logo" className="company-logo" />
      </header>
      <div className='Content'>
        <h2 style={{ textAlign: 'center' }}>Please Upload your Pictures in The Respective field</h2>
        <form onSubmit={onSubmitClick}>
          <div className='form-container'>
            <div className="form-group">
              <label htmlFor="emailId">Email ID:</label>
              <input
                type="email"
                id="emailId"
                name="emailId"
                value={formValues.emailId}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="temperature">Temperature:</label>
              <input
                type="text"
                id="temperature"
                name="temperature"
                value={formValues.temperature}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="humidity">Humidity:</label>
              <input
                type="text"
                id="humidity"
                name="humidity"
                value={formValues.humidity}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="ph">pH:</label>
              <input
                type="text"
                id="ph"
                name="ph"
                value={formValues.ph}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="soilMoisture">Soil Moisture:</label>
              <input
                type="text"
                id="soilMoisture"
                name="soilMoisture"
                value={formValues.soilMoisture}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="diseaseName">Disease Name:</label>
              <input
                type="text"
                id="diseaseName"
                name="diseaseName"
                value={formValues.diseaseName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="diseaseImage">Upload Disease Image:</label>
              <input
                type="file"
                id="diseaseImage"
                accept="image/*"
                onChange={(e) => handleFileChange('diseaseImage', e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="primaryHealthMap">Upload Primary Health Map:</label>
              <input
                type="file"
                id="primaryHealthMap"
                accept="image/*"
                onChange={(e) => handleFileChange('primaryHealthMap', e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="secondaryHealthMap">Upload Secondary Health Map:</label>
              <input
                type="file"
                id="secondaryHealthMap"
                accept="image/*"
                onChange={(e) => handleFileChange('secondaryHealthMap', e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="primaryGeoImage">Upload Primary Geo Image:</label>
              <input
                type="file"
                id="primaryGeoImage"
                accept="image/*"
                onChange={(e) => handleFileChange('primaryGeoImage', e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="secondaryGeoImage">Upload Secondary Geo Image:</label>
              <input
                type="file"
                id="secondaryGeoImage"
                accept="image/*"
                onChange={(e) => handleFileChange('secondaryGeoImage', e)}
              />
            </div>
            <button type="submit">Upload</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;
