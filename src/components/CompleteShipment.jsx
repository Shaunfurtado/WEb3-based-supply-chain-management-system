import React, { useState } from "react";

const CompleteShipment = ({ completeShipment }) => {
  const [completeShip, setCompleteShip] = useState({
    recipient: "",
    index: "",
  });
  const changeStatus = async () => {
    completeShipment(completeShip);
  };
  return CompleteShipment ? (
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
                placeholder="Enter Address"
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
      </div>
    </div>
  ) : (
    ""
  );
};
export default CompleteShipment;
