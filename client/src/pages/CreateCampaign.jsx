import React , {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import  {ethers} from 'ethers';
import {money} from '../assets';
import { CustomButton, FormField } from '../components';
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
 //update every field accordingly: 
 const handleFormFieldChange = (fieldName, e) => {
  setForm({ ...form , [fieldName]: e.target.value})
 }

 //transmit obtained value 
  const handleSubmit = (e) =>{
    e.preventDefault(); //prevent page reload after from submission
    console.log(form);

  }
  
  
  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] 
    sm:p-10 p-4">
      
      <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] 
      bg-[#3a3a43] rounded-[10px]'>
          <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>Start a campaign</h1>
          </div>

          <form onSubmit = {handleSubmit} className='w-full mt-[65px] flex flex-col gap-[30px]'>
            <div className='flex flex-wrap gap-[40px]'>
            <FormField 
            labelName="Personal name * "
            placeholder="e.g. John Stevens"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name',e)}
          />
            <FormField 
            labelName="Campaign title * "
            placeholder="e.g. Stop waste "
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title',e)}          
            />
          </div>
          <div>
          <FormField 
            labelName="Story * "
            placeholder="Tell donators about more your campaign ... "
            isTextArea
            value={form.description}
            handleChange={(e) => handleFormFieldChange('description',e)}      
            />
          </div>
          <div className='w-full flex justify-start items-center p-4 
          bg-[#c59a06] h-[90px] rounded-[10px]'>
            <img src={money} alt="money bag" 
            className='w-[40px] h-[40px] object-contain' />
               <h4 className='font-epilogue font-bold text-white text-[20px] ml-[25px]'>
                You will get 100% of the raised amounts !! </h4>
          </div>
          <div className='flex flex-wrap gap-[40px]'>
            <FormField 
            labelName="Goal * "
            placeholder="e.g. amount of ETH to raise"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target',e)}
          />
            <FormField 
            labelName="End date * "
            placeholder="e.g. date for deadline "
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline',e)}
          />
          </div>
          <div>
           <FormField 
            labelName="Compaign image * "
            placeholder="insert you image URL"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange('image',e)}
          />
          </div>
          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton 
              btnType="submit"
              title="Submit new campaign"
              styles="bg-[#1dc071]"
            />
          </div>
          </form>
    </div>
  )
}

export default CreateCampaign