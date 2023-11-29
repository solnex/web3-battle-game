import React, { useState } from 'react';
import { PageHOC } from '../components';
import { useGlobalContext } from '../context';
import { CustumInput } from '../components';
import { CustumButton } from '../components';
const Home = () => {
  const { contract, walletAddress, alertInfo, setAlertInfo } = useGlobalContext();
  const [playerName, setPlayerName] = useState('');
  const handleClick = async () => {
    try {
      console.log(walletAddress);
      console.log("contract:", contract)
      const isPlayerRegistered = await contract.isPlayer(walletAddress);
      console.log(isPlayerRegistered)
      if (!isPlayerRegistered) {
        await contract.registerPlayer(playerName, playerName);
      }
    }
    catch (err) {
      console.log(err);
      setAlertInfo({ status: true, type: 'failure', message: "Something went wrong" })

    }

  }
  return (
    <div className='flex flex-col'>
      <CustumInput
        label="Name"
        placeholder="Enter your name"
        value={playerName}
        handleValueChange={setPlayerName}
      />
      <CustumButton
        title="Register"
        handleClick={handleClick}
        restStyles="mt-6" />
    </div>
  )
};

export default PageHOC(Home,
  <>Welcome to AVAX Gods  <br /> a Web3 NFT Card Game </>,
  <>Connect your wallet to start playing <br /> the ultimate
    web3 battle card game</>
);