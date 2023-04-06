// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {   
        struct Campaign {
            address owner;
            string title; 
            string description;
            uint256 target; //target amount we want to acheive
            uint256 deadline;
            uint256 amountCollected;
            string image; //URL of the image
            address[] donators; //identify all the donators
            uint256[] donations; //to keep track of progress
        }

mapping (uint256 => Campaign) public campaigns;

uint256 public numberOfCampaigns = 0;

//we need to define functions that will allow us to put the contract to use
//we need 'memory' keyword whenever we  have a string

function createCompaign(address _owner, string memory _title, string memory _description, 
uint256 _target , uint256 _deadline, string memory _image) public returns (uint256){

// polulate the campaign array as follows
Campaign storage campaign = campaigns[numberOfCampaigns];
// require: a condition that the function should verify
require(campaign.deadline < block.timestamp, "Please provide a correct deadline date");

//the execution will proceed only if the previous condition is satisfied
campaign.owner = _owner;
campaign.title = _title;
campaign.description = _description;
campaign.target = _target;
campaign.deadline = _deadline;
campaign.image = _image;
campaign.amountCollected = 0;

numberOfCampaigns ++;

//this function will return the index of the newly created campaign
return numberOfCampaigns - 1;
}


function donateToCampaign(uint256 _id) public payable {

    //parameter: the id of the campaign we want to donate to
    // payable : keyword that indeacates that crypto will be sent through this function
    
    uint256 amount = msg.value;

    Campaign storage campaign = campaigns[_id]; //thx to mapping
    campaign.donators.push(msg.sender); // save the donor address
    campaign.donations.push(amount);

    // sent : will let us know if the transaction was completed or not
    // ADD COMMA after sent bcz payable returns two things - we'll only need the 1st one
    
    (bool sent,) = payable(campaign.owner).call{value : amount}("");
    if (sent) {
        campaign.amountCollected = campaign.amountCollected + amount;
    }
}

function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory){

    //return donators and their donations according to the compaign id given 
    return(campaigns[_id].donators, campaigns[_id].donations);
}

function getCampaigns () public view returns (Campaign[] memory){
    
    //create an empty array of campaigns and loop through all the campaigns in order to populate the new variable
    // --> deep copy to get all the elements istead of just the ARRAY ADDRESS

    Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);
    for (uint i = 0 ; i < numberOfCampaigns ; i ++ ){
        Campaign storage item = campaigns[i];
        allCampaigns[i] = item;
    }
    return allCampaigns;
}
    
}