import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NavBar, Footer, Home, Table, CreateShipment, StartShipment, CompleteShipment, TrackingLogs, VerifyProduct, Shipments, GetShipment } from './components/index';

// Internal import
import { TrackingProvider, createShipment, startShipment, completeShipment, getAllShipment, getShipment} from './components/Context/TrackingContext';

export default function App() {
  const [shipmentData, setShipmentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllShipment();
      setShipmentData(data);
    };

    fetchData();
  }, []);

  return (
    <Router>
      <TrackingProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/table" element={<Table allShipmentsData={shipmentData} />} />
          <Route path="/create-shipment" element={<CreateShipment createShipment={createShipment} />} />
          <Route path="/start-shipment" element={<StartShipment startShipment={startShipment} />} />
          <Route path="/complete-shipment" element={<CompleteShipment completeShipment={completeShipment} />} />
          <Route path="/tracking-logs" element={<TrackingLogs getAllShipment={getAllShipment} />} />
          <Route path="/verify-product" element={<VerifyProduct />} />
          <Route path="/shipments" element={<Shipments />} />
          <Route path="/get-shipment" element={<GetShipment getShipment={getShipment} />} />
        </Routes>
      </TrackingProvider>
      <Footer />
    </Router>
  );
}
