import React, {useContext,createContext} from 'react';
import {useAddress, useContract, useMetamask, useContractWrite , useContractRead} from '@thirdweb-dev/react';
import {ethers} from 'ethers';
const StateContext = createContext();

//wrap entire app with context provider and render all the children inside of it.
export const StateContextProvider = ({ children }) => {
    
    //connect to the smart contract (locally deployed) by providing a contract address
    const { contract } = useContract('0x9D8e928f988f23a985684eCA445b2B00Fdc567C8')
    const { mutateAsync: createCampaign  } = useContractWrite(contract, 'createCampaign');
    
    const address = useAddress();
    //connect a smart wallet
    const connect = useMetamask();

    //1st call to smart contract
    const publishCampaign = async (form) => {
        try {
            //wrap in try n catch block to ensure this works well 
            const data = await createCampaign( {args: [
            //in the order in which they were defined in the .sol file
            address, // owner
            form.title, // title
            form.description, // description
            form.target,
            new Date(form.deadline).getTime(), // deadline,
            form.image
             ]})
    
          console.log("contract call success", data)
        } catch (error) {
          console.log("contract call failure", error)
        }
      }

      const getCampaigns = async () => {

        const campaigns = await contract.call("getCampaigns");
        //console.log(campaings);

        const parsedCampaings = campaigns.map((campaign, index) => ({
          //only display important elements + format big numbers to human readable numbers
          pId: index,// index to order campaigns
          owner: campaign.owner,
          title: campaign.title,
          description: campaign.description,
          target: ethers.utils.formatEther(campaign.target.toString()),
          deadline: campaign.deadline.toNumber(),
          amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
          image: campaign.image
          
        }));
        // console.log(parsedCampaings);

        return parsedCampaings;

      }
      //get only the campaigns of the logged in owner
      const getOwnerCampaigns = async () => {
        const allCampaigns = await getCampaigns();
        const filterdCampaigns = allCampaigns.filter((campaign)=> 
          campaign.owner == address
        )
        return filterdCampaigns;
      }


      const donateToACampaign = async (pId, amount ) => {
        const data = await contract.call("donateToCampaign",pId,{value: ethers.utils.parseEther(amount)});
        return data;
      } 

      const getDonations = async (pId) => {
        const donations = await contract.call("getDonators",pId)
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];
        for (let i=0 ; i<numberOfDonations ; i++) {
          parsedDonations.push({
            donator: donations[0][i],
            donation : ethers.utils.formatEther(donations[1][i].toString())
          })
        }
        return parsedDonations;
      }
    //pass the function from te context to the form using the return of contexnumberOf Dot provider
    return (
        <StateContext.Provider
          value={{ 
            address,
            contract,
            connect,
            //rename publish campaign to create campaign
            createCampaign: publishCampaign,
            getCampaigns,
            getOwnerCampaigns,
            donateToACampaign,
            getDonations
      
          }}
        >
        {children}
        </StateContext.Provider>
      )
}
// utilize context by creating a custom hook 
export const useStateContext = () => useContext(StateContext);
