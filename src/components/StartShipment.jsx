import React, { useState } from "react";

const StartShipment = ({ startShipment }) => {
  const [getProduct, setGetProduct] = useState({
    recipient: "",
    index: "",
  });

  const startShipping = () => {
    startShipment(getProduct);
  };
  return StartShipment ? (
    <div className="flex items-center justify-center h-screen">
      <div className="card w-96 bg-neutral text-neutral-content">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Start Shipment</h2>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Receiver Address</span>
              </label>
              <input
                type="text"
                placeholder="Enter Address"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) =>
                  setGetProduct({ ...getProduct, recipient: e.target.value })
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
                  setGetProduct({ ...getProduct, index: e.target.value })
                }
              />
            </div>
            <div className="card-actions justify-end">
              <button
                onClick={() => startShipping()}
                className="btn btn-primary"
              >
                Accept
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
};
export default StartShipment;
