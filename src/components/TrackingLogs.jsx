import React from "react";

const TrackingLogs = ({ allShipmentsData }) => {
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
            <th>Sender</th>
            <th>Receiver</th>
            <th>ProductID</th>
            <th>PickUpTime</th>
            <th>Distance</th>
            <th>Price</th>
            <th>DeliveryTime</th>
            <th>Payment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(allShipmentsData) &&
            allShipmentsData.map((shipment, idx) => (
              <tr key={idx} className="hover">
                <th>
                  {shipment.sender ? shipment.sender.slice(0, 15) : "N/A"}...
                </th>
                <td>
                  {shipment.recipient ? shipment.recipient.slice(0, 15) : "N/A"}
                  ...
                </td>
                <td>{shipment.productID}</td>
                <td>{converTime(shipment.pickupTime)}</td>
                <td>{shipment.distance} Km</td>
                <td>{shipment.price} ETH</td>
                <td>{shipment.deliveryTime}</td>
                <td>{shipment.isPaid ? "Completed" : "Not Complete"}</td>
                <td>
                  {shipment.status === 0
                    ? "Pending"
                    : shipment.status === 1
                    ? "IN_TRANSIT"
                    : "Delivered"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrackingLogs;
