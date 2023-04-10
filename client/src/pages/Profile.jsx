import React, {useState, useEffect} from 'react';
import { useStateContext } from '../context';
import {DisplayCampaigns} from '../components';

const Profile = () => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const {address, contract, getOwnerCampaigns} = useStateContext();

  const fetchOwnerCampaigns = async () => {
    setIsLoading(true);
    const data = await getOwnerCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  } 

  useEffect(() => {
    if(contract) fetchOwnerCampaigns();
  }, [address, contract]);

  return (
    <DisplayCampaigns
    title = "All personal campaigns"
    isLoading = {isLoading} 
    campaigns = {campaigns} />
  )
}

export default Profile