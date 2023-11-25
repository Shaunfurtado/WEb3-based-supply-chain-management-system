import React, { useState } from "react";
import QrReader from "react-qr-scanner";

const GetShipment = ({ getShipment }) => {
  const [index, setIndex] = useState(0);
  const [singleShipmentData, setSingleShipmentData] = useState();
  const [inputValue, setInputValue] = useState("");

  const handleScan = (data) => {
    if (data) {
      console.log("Result of scan: ", data);
      const numData = parseInt(data.text, 10);
      if (!isNaN(numData) && numData !== 0) {
        setIndex(numData);
        setInputValue(numData.toString());
        getShipmentData();
      } else {
        console.error("Scanned data is not a valid number: ", data.text);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const getShipmentData = async () => {
    try {
      const getData = await getShipment(index);
      setSingleShipmentData(getData);
      console.log(getData);
    } catch (error) {
      console.error("Error getting shipment data:", error);
    }
  };

  const convertTime = (time) => {
    const newTime = new Date(time);
    const dataTime = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(newTime);

    return dataTime;
  };

  return GetShipment ? (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="flex justify-center items-center min-h-screen">
          <div className="container flex flex-col w-full lg:flex-row">
            <div className="card w-96 bg-neutral text-neutral-content flex items-center justify-center">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">Get Shipment Data</h2>
                  <div className="join">
                    <div className="form-control">
                      <input
                        type="number"
                        placeholder="Enter Id"
                        className="input input-bordered join-item"
                        // onChange={(e) => setIndex(e.target.value)}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                    </div>
                    <div
                      onClick={() => getShipmentData()}
                      className="card-actions justify-end"
                    >
                      <button className="btn join-item rounded btn-primary ">
                        Get Data
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div class="divider">OR</div>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">Scan QR Code</h2>
                  <label htmlFor="my_modal_7" className="btn">
                    Scan
                  </label>
                  <input
                    type="checkbox"
                    id="my_modal_7"
                    className="modal-toggle"
                  />
                  <div className="modal" role="dialog">
                    <div className="modal-box">
                      <QrReader
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: "100%" }}
                      />
                    </div>
                    <label className="modal-backdrop" htmlFor="my_modal_7">
                      Close
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <div className="divider lg:divider-horizontal"></div>
            <div className="card w-96 bg-base-400 shadow-2xl ">
              <div className="card-body flex items-center justify-center ">
                {singleShipmentData === undefined ? (
                  ""
                ) : (
                  <div className="text-center gap-4">
                    <input
                      type="text"
                      placeholder={`Sender: ${singleShipmentData.sender}`}
                      className="input input-bordered w-full max-w-xs "
                      disabled
                    />
                    <input
                      type="text"
                      placeholder={`Receiver: ${singleShipmentData.recipient}`}
                      className="input input-bordered w-full max-w-xs"
                      disabled
                    />
                    <input
                      type="text"
                      placeholder={`PickupTime: ${convertTime(
                        singleShipmentData.pickupTime
                      )}`}
                      className="input input-bordered w-full max-w-xs"
                      disabled
                    />
                    <input
                      type="text"
                      placeholder={`DeliveryTime: ${
                        singleShipmentData.deliveryTime
                          ? convertTime(singleShipmentData.deliveryTime * 1000)
                          : "Not Delivered"
                      }`}
                      className="input input-bordered w-full max-w-xs"
                      disabled
                    />
                    <input
                      type="text"
                      placeholder={`Distance: ${singleShipmentData.distance} Km`}
                      className="input input-bordered w-full max-w-xs"
                      disabled
                    />
                    <input
                      type="text"
                      placeholder={`Price: ETH ${singleShipmentData.price}`}
                      className="input input-bordered w-full max-w-xs"
                      disabled
                    />
                    <input
                      type="text"
                      placeholder={`Status: ${singleShipmentData.status}`}
                      className="input input-bordered w-full max-w-xs"
                      disabled
                    />
                    <input
                      type="text"
                      placeholder={`Payment: ${
                        singleShipmentData.paid ? "Completed" : "Not Completed"
                      }`}
                      className="input input-bordered w-full max-w-xs"
                      disabled
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default GetShipment;
