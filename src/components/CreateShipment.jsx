import React, { useState } from "react";

const CreateShipment = ({ createShipment }) => {
  console.log("createShipment function:", createShipment);
  const [shipment, setShipment] = useState({
    recipient: "",
    pickupTime: "",
    distance: "",
    price: "",
  });

  const createItem = async () => {
    try {
      await createShipment(shipment);
    } catch (error) {
      console.log("Error creating item:", error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card w-96 bg-neutral text-neutral-content center">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Create Shipment</h2>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Receiver Address</span>
              </label>
              <input
                type="text"
                placeholder="Enter Address"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) =>
                  setShipment({
                    ...shipment,
                    recipient: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Pick Up Time</span>
              </label>
              <input
                type="date"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) =>
                  setShipment({
                    ...shipment,
                    pickupTime: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Distance</span>
              </label>
              <input
                type="number"
                placeholder="Enter Distance"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) =>
                  setShipment({
                    ...shipment,
                    distance: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                placeholder="Enter Price"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) =>
                  setShipment({
                    ...shipment,
                    price: e.target.value,
                  })
                }
              />
            </div>
            <div className="card-actions justify-end">
              <button onClick={() => createItem()} className="btn btn-primary">
                Accept
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateShipment;
