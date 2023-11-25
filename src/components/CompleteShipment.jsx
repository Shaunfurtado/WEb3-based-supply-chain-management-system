import React, { useState } from "react";
import QrReader from "react-qr-scanner";

const CompleteShipment = ({ completeShipment }) => {
  const [completeShip, setCompleteShip] = useState({
    recipient: "",
    index: "",
  });
  const [isScanning, setIsScanning] = useState(false);
  const [scannedDataPlaceholder, setScannedDataPlaceholder] =
    useState("Enter Address");

  const changeStatus = () => {
    completeShipment(completeShip);
  };

  const handleScan = (data) => {
    if (data) {
      console.log("Result of scan: ", data);
      const scannedAddress = data.text;
      setScannedDataPlaceholder(scannedAddress);
      if (scannedAddress.length >= 42) {
        const recipient = scannedAddress.substring(0, 42);
        const index = scannedAddress.substring(42);
        setCompleteShip({
          ...completeShip,
          recipient: recipient,
          index: index,
        });
        setIsScanning(false);
      } else {
        console.error("Scanned data is not valid: ", scannedAddress);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const toggleScanner = () => {
    setIsScanning((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card w-96 bg-neutral text-neutral-content">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Complete Shipment</h2>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Receiver Address</span>
              </label>
              <input
                type="text"
                placeholder={scannedDataPlaceholder}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) =>
                  setCompleteShip({
                    ...completeShip,
                    recipient: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">ID</span>
              </label>
              <input
                type="number"
                placeholder="Enter Id"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) =>
                  setCompleteShip({ ...completeShip, index: e.target.value })
                }
              />
            </div>
            <div
              onClick={() => changeStatus()}
              className="card-actions justify-end"
            >
              <button className="btn btn-primary">Accept</button>
            </div>
          </div>
        </form>
        <div className="divider">OR</div>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Scan QR Code</h2>
          <label htmlFor="my_modal_9" className="btn" onClick={toggleScanner}>
            {isScanning ? "Stop Scan" : "Start Scan"}
          </label>
          <input type="checkbox" id="my_modal_9" className="modal-toggle" />
          {isScanning && (
            <div className="modal" role="dialog">
              <div className="modal-box">
                <QrReader
                  delay={300}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ width: "100%" }}
                />
              </div>
              <label className="modal-backdrop" htmlFor="my_modal_9">
                Close
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompleteShipment;
