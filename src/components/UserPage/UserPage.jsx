import React, { useState, useEffect } from 'react';
import './UserPage.css';

function App() {
  const [sensorData, setSensorData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [diseases, setDiseases] = useState([]);
  const [tempData, settempData] = useState([]);

  useEffect(() => {
    fetch('http://35.154.176.67:8080/ihfc/getdataforuser?userId=jayapriya@gmail.com')
      .then(response => response.json())
      .then(data => {
        setSensorData(data);
        setIsLoading(false);
        settempData([
            { label: 'Temperature', value: `${data.temperature}°C`, color: 'red' },
            { label: 'pH', value: data.ph, color: 'green' },
            { label: 'Soil Moisture', value: data.soilMoisture, color: 'orange' },
            { label: 'Humidity', value: `${data.humidity}%`, color: 'blue' }
        ]);
        setDiseases([
            { img: data.originalImage, diseasename: data.diseasename, description: data.description },
        ]);
      })
      
      .catch(error => console.error('Error fetching sensor data: ', error));
  }, []);

  const scrollToContent = (id) => {
    const element = document.getElementById(id);
    window.scrollTo({
      behavior: 'smooth',
      top: element.offsetTop,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <div className="sidebar">
        <div className="logo">
        <img src="vtIndia.png" alt="Company Logo" className="company-logo" />
        </div>
        <div className="sidebar-content">
          <a onClick={() => scrollToContent('field-map')}>Field Map</a>
          <a onClick={() => scrollToContent('health-map')}>Health Map</a>
          <a onClick={() => scrollToContent('sensor-data')}>Sensor Data</a>
          <a onClick={() => scrollToContent('plant-disease')}>Plant Disease</a>
          <a onClick={() => scrollToContent('expert-saying')}>Expert Saying</a>
        </div>
      </div>
      <div className="content">
        <h2 id="field-map">Field Map</h2>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
        <div className="field-map-images">
        <img src={`data:image/png;base64,${sensorData.geoMapPrimary}`} alt="Field Map" />
        <img src={`data:image/png;base64,${sensorData.geoMapSecondary}`} alt="Field Map" />
        </div>

        <h2 id="health-map">Health Map</h2>
        <div className="field-map-images">
        <img src={`data:image/png;base64,${sensorData.healthMapPrimary}`} alt="Field Map" />
        <img src={`data:image/png;base64,${sensorData.healthMapSecondary}`} alt="Field Map" />
        </div>

        {/* Content for Health Map goes here */}
        <h2 id="sensor-data">Sensor Data</h2>

        <div className="sensor-datas">
            {tempData.map((sensor, index) => (
                <div key={index} className={`sensor-card ${sensor.color}`}>
                    <div className="sensor-label">{sensor.label}</div>
                    <div className="sensor-value">{sensor.value}</div>
                </div>
            ))}
        </div>

        <h2 id="plant-disease">Plant Disease</h2>
        
        <div className="plant-disease-container">
            <div className="disease-cards">
                {diseases.map((disease, index) => (
                    <div key={index} className="disease-card">
                        <div className="disease-info">
                            <h2>{disease.diseasename}</h2>
                            <p>{disease.description}</p>
                        </div>
                        <img src={`data:image/png;base64,${disease.img}`} alt={disease.diseasename} className="disease-image" />
                    </div>
                ))}
            </div>
        </div>

        <h2 className='sympotoms'>Symptoms</h2>
        <div className="disease-Symptoms">
            
            <div className="disease-card">
            <p>{sensorData.symptoms}</p>
            </div>
          
          
        </div>

        <h2 id="expert-saying">Expert Saying</h2>
        <div className="Expert-Saying">
        <div className="disease-card">
        <p>{sensorData.description}</p>
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
