import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Chain Flow</h1>
          <p className="py-6">
            Streamline your supply chain with ChainFlow, a decentralized app
            providing transparency, automation, and traceability for efficient
            and secure end-to-end operations.
          </p>
          <label htmlFor="my_modal_7" className="btn btn-primary">
            Get Started
          </label>
          <input type="checkbox" id="my_modal_7" className="modal-toggle" />
          <div className="modal" role="dialog">
            <div className="modal-box">
              <h3 className="text-lg font-bold">Hello</h3>
              <p className="py-4">This modal works with a hidden checkbox!</p>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_7">
              Close
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 justify-items-center">
          <Link to="/create-shipment">
            <Card
              title="Create Shipment"
              description="Create your Shipment for the products"
              buttonText="Go to Create Shipment"
            />
          </Link>
          <Link to="/start-shipment">
            <Card
              title="Start Shipment"
              description="Start shipping for the created shipments"
              buttonText="Go to Start Shipment"
            />
          </Link>
          <Link to="/complete-shipment">
            <Card
              title="Complete Shipment"
              description="Complete the Shipping for the started shipments"
              buttonText="Go to Complete Shipment"
            />
          </Link>
          <Link to="/get-shipment">
            <Card
              title="Verify/Get Product data"
              description="Verify / Get the product details using QR codes"
              buttonText="Go to Product Verification"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
