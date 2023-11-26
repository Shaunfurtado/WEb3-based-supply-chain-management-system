# SNH01 - Block Busters

## WEb3 based supply chain management system

### Used packages:-
- hardhat@2.19.2
- ethers@5.7.2
- web3modal@1.9.12
- react@18
- react-qr-code
- react-qr-scanner

### To run this app
```
npm install
```
```
npx hardhat init
```
```
npx hardhat node
```
```
npx hardhat run --network localhost scripts/deploy.js 
```
Now, move the Tracking.Json file which is created in ./artifacts/contracts/ to ./src/components/Context/
to accesss the Tracking ABI of the smart contracts.

### Run the React app with development server
```
npm run start
```

Now, go to [localhost:3000](localhost:3000)
