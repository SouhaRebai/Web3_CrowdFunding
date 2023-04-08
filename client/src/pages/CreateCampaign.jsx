import React , {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import  {ethers} from 'ethers';
import {money} from '../assets';
import { CustomButton } from '../components';
import {checkIfImage} from '../utils';
const CreateCampaign = () => {
  const navigate = useNavigate();
  const [loading , isLoading] = useState(false);
  const [form, setForm] = useState({
    name:'',
    title:'',
    description:'',
    target:'',
    deadline:'',
    image:''
  });

  const handleSubmit = () =>{

  }
  
  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] 
    sm:p-10 p-4">
      
      <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] 
      bg-[#3a3a43] rounded-[10px]'>
          <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>Start a campaign</h1>
          <form onSubmit ='handleSubmit()'></form>
      </div>
    </div>
  )
}

export default CreateCampaign