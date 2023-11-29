import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { ethers, providers } from 'ethers';
import Web3Modal from 'web3modal';
import { ABI, ADDRESS } from "../contract";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [walletAddress, setWalletAddress] = useState('');
    const [provider, setProvider] = useState('');
    const [contract, setContract] = useState('');
    const [alertInfo, setAlertInfo] = useState({ status: false, type: 'info', message: '' })
    const updateCurrentWalletAddress = async () => {
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
        });
        setWalletAddress(accounts[0])

    }
    // set current wallet address state
    useEffect(() => {
        updateCurrentWalletAddress();

        window.ethereum.on('accountsChanged', updateCurrentWalletAddress);
    }, []);
    //set contract and provider state
    useEffect(() => {
        const setSmartContractAndProvider = async () => {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const newProvider = new ethers.providers.Web3Provider(connection);
            const signer = newProvider.getSigner();
            const contract = new ethers.Contract(ADDRESS, ABI, signer);

            setProvider(newProvider);
            setContract(contract);
        }
        setSmartContractAndProvider();
    }, [])

    useEffect(() => {
        if (alertInfo?.status) {
            const timer = setTimeout(() => {
                setAlertInfo({ status: false, type: 'info', message: '' })
            }, [3000])

            return () => {
                clearTimeout(timer);
            }
        }
    }, [alertInfo]);



    return (
        <GlobalContext.Provider value={
            { provider, walletAddress, contract, alertInfo, setAlertInfo }}>
            {children}
        </GlobalContext.Provider >
    )
}
export const useGlobalContext = () => useContext(GlobalContext);