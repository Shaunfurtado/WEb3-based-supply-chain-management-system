import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import tracking from "./Tracking.json";

const ContractAddress="0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ContractABI = tracking.abi;

const fetchContract = (signerOrProvider) => 
 new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);

export const createShipment = async (items) => {
    console.log(items);
    const { recipient, pickupTime, distance, price } = items;

    try {
        const Web3ModalInst = new Web3Modal();
        const connection = await Web3ModalInst.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        const createItem = await contract.createShipment(
            recipient,
            new Date(pickupTime).getTime(),
            distance,
            ethers.utils.parseUnits(price, 18),
            {
                value: ethers.utils.parseUnits(price, 18),
            }
        );
    await createItem.wait();
    console.log(createItem);
    } catch (error) {
        console.log("Something Went Wrong: CreateShipment", error);
    }
};

export const getAllShipment = async () => {
    try {
        // const provider = new ethers.providers.JsonRpcProvider();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = fetchContract(provider);

        const shipments = await contract.getAllTransactions();
        const allShipments = shipments.map((shipment) => ({
            sender: shipment.sender,
            recipient: shipment.recipient,
            price: ethers.utils.formatEther(shipment.price.toString()),
            pickupTime: shipment.pickupTime.toNumber(),
            deliveryTime: shipment.deliveryTime.toNumber(),
            distance: shipment.distance.toNumber(),
            isPaid: shipment.isPaid,
            status: shipment.status,
        }));

        return allShipments;
    } catch (error) {
  console.error("Error in getAllShipment:",error.message, error);
  return [];
}
};
export const startShipment = async (getProduct) => {
    const { recipient, index } = getProduct;
    try {
        if (!window.ethereum) return "Install Metamask";

        const accounts = await window.ethereum.request({ method: 'eth_accounts' });

        const Web3ModalInst = new Web3Modal();
        const connection = await Web3ModalInst.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        const shipment = await contract.startShipment(
            accounts[0],
            recipient,
            index * 1
        );

        shipment.wait();
        console.log(shipment);
    } catch (error) {
        console.log("Sorry No shipment: StartShipment", error);
    }
};
export const completeShipment = async (completeShip) => {
    console.log(completeShip);

    const { recipient, index } = completeShip;
    try {
        if (!window.ethereum) return "Install Metamask";

        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const Web3ModalInst = new Web3Modal();
        const connection = await Web3ModalInst.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        const transaction = await contract.completeShipment(
            accounts[0],
            recipient,
            index,
            {
                gasLimit: 300000,
            }
        );

        const updateTransaction = await transaction.wait();
        if (updateTransaction.status === 1) {
            console.log("Transaction Successful");
        }

        console.log(updateTransaction);
    } catch (error) {
        console.log("Something Went Wrong: completeShipment", error);
    }
};

export const getShipmentsCount = async () => {
    try {
        if (!window.ethereum) return "Install Metamask";

        console.log("Before contract call");
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });

        const Web3ModalInst = new Web3Modal();
        const connection = await Web3ModalInst.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        const shipmentsCount = await contract.getShipmentsCount(accounts[0]);
        return shipmentsCount.toNumber();
    } catch (error) {
        console.log("Error in getShipmentsCount:", error);
        return 0;
    }
};

export const getShipment = async (index) => {
    console.log(index * 1);
    try {
         if (!window.ethereum) return "Install Metamask";

         const accounts = await window.ethereum.request({ method: 'eth_accounts' });

      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const shipment = await contract.getShipment(accounts[0], index * 1);

      const SingleShipment = {
        sender: shipment[0],
        recipient: shipment[1],
        pickupTime: shipment[2].toNumber(),
        deliveryTime: shipment[3].toNumber(),
        distance: shipment[4].toNumber(),
        price: ethers.utils.formatEther(shipment[5].toString()),
        status: shipment[6],
        isPaid: shipment[7],
    };

    return SingleShipment;
    } catch (error) {
        console.log("Something Went Wrong with getShipment, no shipment");
    }
};


export const TrackingContext = React.createContext();
export const TrackingProvider = ({ children }) => {
    const DappName = "Decentralized Product Tracking";
    const [currentUser, setCurrentUser] = useState("");

    const checkIfWalletIsConnected = async () => {
        try {
            if (!window.ethereum) return "Install Metamask";

            const accounts = await window.ethereum.request({ method: 'eth_accounts' });

            if (accounts.length) {
                setCurrentUser(accounts[0]);
            } else {
                return "No Account";
            }
        } catch (error) {
            return "Not Connected";
        }
    };

    //-- Connect Wallet
    const connectWallet = async () => {
        try {
            if (!window.ethereum) return "Install Metamask";

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            setCurrentUser(accounts[0]);
        } catch (error) {
            return "Something Went Wrong: ConnetWallet";
        }
    };

    //-- useEffect
    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <TrackingContext.Provider
          value={{
            currentUser,
            connectWallet,
            createShipment,
            getAllShipment,
            getShipment,
            getShipmentsCount,
            completeShipment,
            startShipment,
            DappName,
          }}
        >
          {children}
        </TrackingContext.Provider>
      );
};
