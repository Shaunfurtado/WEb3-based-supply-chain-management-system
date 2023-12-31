import React from "react";
import QRCode from "react-qr-code";

const Table = ({ allShipmentsData }) => {
  const converTime = (time) => {
    const newTime = new Date(time);
    const dataTime = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(newTime);

    return dataTime;
  };

  if (!Array.isArray(allShipmentsData) || allShipmentsData.length === 0) {
    return <p>No shipments available.</p>;
  }

  console.log("All Shipments Data:", allShipmentsData);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Index</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>PickUpTime</th>
            <th>Distance</th>
            <th>Price</th>
            <th>DeliveryTime</th>
            <th>Payment</th>
            <th>Status</th>
            <th>QR Code</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(allShipmentsData) &&
            allShipmentsData.map((shipment, idx) => (
              <tr key={idx} className="hover">
                <th>{idx}</th>
                <th>
                  {shipment.sender ? shipment.sender.slice(0, 15) : "N/A"}...
                </th>
                <td>
                  {shipment.recipient ? shipment.recipient.slice(0, 15) : "N/A"}
                  ...
                </td>
                <td>{converTime(shipment.pickupTime)}</td>
                <td>{shipment.distance} Km</td>
                <td>{shipment.price} ETH</td>
                <td>
                  {shipment.deliveryTime
                    ? converTime(shipment.deliveryTime * 1000)
                    : "Not Delivered"}
                </td>
                <td>{shipment.isPaid ? "Completed" : "Not Complete"}</td>
                <td>
                  {shipment.status === 0
                    ? "Pending"
                    : shipment.status === 1
                    ? "IN_TRANSIT"
                    : "Delivered"}
                </td>
                <td>
                  <label htmlFor={`my_modal_${idx}`} className="btn">
                    QR Code
                  </label>
                  <input
                    type="checkbox"
                    id={`my_modal_${idx}`}
                    className="modal-toggle"
                  />
                  <div className="modal" role="dialog">
                    <div className="modal-box w-3/12 max-w-1xl flex justify-center items-center">
                      <QRCode value={`${shipment.recipient}${idx}`} />
                    </div>
                    <label
                      className="modal-backdrop"
                      htmlFor={`my_modal_${idx}`}
                    >
                      Close
                    </label>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
