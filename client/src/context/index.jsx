import React, {useContext,createContext} from 'react';
import {useAddress, useContract, useMetamask, useContractWrite} from '@thirdweb-dev/react';
import {ethers } from 'ethers';

const StateContext = createContext();

//wrap entire app with context provider and render all the children inside of it.
export const StateContextProvider = ({ children }) => {
    
    //connect to the smart contract (locally deployed) by providing a contract address
    const { contract } = useContract('0x031c0fEd46445543A3d6C3A2581a09Eb33ED7897')
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
    
    const address = useAddress();
    //connect a smart wallet
    const connect = useMetamask();

    //1st call to smart contract
    const publishCampaign = async (form) => {
        try {
            //wrap in try n catch block to ensure this works well 
            const data = await createCampaign([
            //in the order in which they were defined in the .sol file
            address, // owner
            form.title, // title
            form.description, // description
            form.target,
            new Date(form.deadline).getTime(), // deadline,
            form.image
          ])
    
          console.log("contract call success", data)
        } catch (error) {
          console.log("contract call failure", error)
        }
      }
    //pass the function from te context to the form using the return of context provider
    return (
        <StateContext.Provider
          value={{ 
            address,
            contract,
            //rename publish compaign to create compaign
            createCampaign: publishCampaign,
      
          }}
        >
        {children}
        </StateContext.Provider>
      )
}
// utilize context by creating a custom hook 