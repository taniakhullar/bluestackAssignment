import React from 'react'
import {upcomingCampaignData,liveCampaignData,pastCampaignData} from './sampleData'
import CampaignTable from './CampaignTable'
import {English,German} from '../assets/languages'

class Campaigns extends React.Component{

    constructor(){
        super();
        this.state={
            campaignData: upcomingCampaignData?.data, // stores data of active Tab
            activeTab: 'upcomingCampaign', // current tab
            currLanguage: 'English'
        };
    }
    //upcoming Campaigns clicked 
    upcomingClicked = ()=>{
        this.setState({
            campaignData: upcomingCampaignData?.data,
            activeTab: 'upcomingCampaign'
        })
    }
    //Live Campaigns clicked 
    liveClicked = ()=>{
        this.setState({
            campaignData: liveCampaignData?.data,
            activeTab: 'liveCampaign'
        })
    }
    //Past Campaigns clicked 
    pastClicked = ()=>{
        this.setState({
            campaignData: pastCampaignData?.data,
            activeTab: 'pastCampaign'
        })
    }
    removeFromTable =(item)=>{
        let {activeTab} = this.state;
        let tabDataMapping={
            'upcomingCampaign': upcomingCampaignData?.data,
            'liveCampaign': liveCampaignData?.data,
            'pastCampaign': pastCampaignData?.data,
        }
        let removeFrom = tabDataMapping[activeTab];
        let len = removeFrom.length;
        let indexToRemove = removeFrom.indexOf(item);
        let swapVar = removeFrom[len-1];
        removeFrom[len-1] = item;
        removeFrom[indexToRemove] = swapVar;
        removeFrom.length= len-1;
        this.setState({campaignData:removeFrom})
    }
    //when campaign reschduled remove it from current table and add in corresponding
    reArrangeTables = (item,date)=>{
        let {activeTab,campaignData} = this.state;
        let schduledDate = new Date(date).getDate();
        let currDate = new Date().getDate();
        let schduleMonth = new Date(date).getMonth();
        let currMonth = new Date().getMonth();
        let schduleYear = new Date(date).getFullYear();
        let currYear = new Date().getFullYear();
        if(schduledDate == currDate && schduleMonth==currMonth && schduleYear ==currYear){// campgain is schduled for today i.e live Campaign
            if(activeTab!== 'liveCampaign'){ //if item is not in live campaign table already
                this.removeFromTable(item);//remove it from its current table
                item.createdOn = new Date(date).getTime();
                liveCampaignData?.data.push(item);//push in required table
                // set createdon property to schduled time
            }else{
                let ind = campaignData.indexOf(item)
                campaignData[ind].createdOn =  new Date(date).getTime();
                this.setState({campaignData});
            }
        }
        else if(schduleMonth > currMonth || schduleYear >currYear ||(schduledDate > currDate && schduleMonth==currMonth)){// campgain is schduled for any day after today i.e upcoming Campaign
            if(activeTab!== 'upcomingCampaign'){
                this.removeFromTable(item);
                item.createdOn = new Date(date).getTime();
                upcomingCampaignData?.data.push(item);
            }else{
                let ind = campaignData.indexOf(item);
               campaignData[ind].createdOn =  new Date(date).getTime()
                this.setState({campaignData})
            }
        }else{
            if(activeTab!== 'pastCampaign'){
                this.removeFromTable(item);
                item.createdOn = new Date(date).getTime();
                pastCampaignData.data.push(item);
            }else{
                let ind = campaignData.indexOf(item)
               campaignData[ind].createdOn =  new Date(date).getTime()
                this.setState({campaignData})
            }
        }
    }
    setLangauge =(e)=>{
        this.setState({currLanguage:e?.target?.value})
    }
    render(){
        let {campaignData,activeTab,currLanguage} = this.state;
        let currLangObj = currLanguage === 'English' ? English : German;
        return(
            <div >
                <div class='header'>
                </div>
                <div class='mainDiv'>
                    <h1 class='heading'>{currLangObj?.heading}</h1>
                <div class='selectDiv'>
                    <label>{currLangObj?.SelectLanguage}</label><br></br>
                    <select onChange={(e)=>this.setLangauge(e)}>
                        <option value='English'>English</option>
                        <option value='German'>German</option>
                    </select>
                </div>
                    <div class='liDiv'>
                        <li class={activeTab === 'upcomingCampaign' ? 'activetab campaginli': 'campaginli'}  onClick={this.upcomingClicked}>
                            {currLangObj?.upcomingCampaigns}</li>
                        <li class={activeTab === 'liveCampaign' ? 'activetab campaginli': 'campaginli'} onClick={this.liveClicked}>
                            {currLangObj?.liveCampaigns}</li>
                        <li class={activeTab === 'pastCampaign' ? 'activetab campaginli': 'campaginli'} onClick={this.pastClicked}>
                        {currLangObj?.pastCampaigns}</li>
                    </div>
                <CampaignTable data={campaignData} reArrangeTables={this.reArrangeTables} currLanguage={currLanguage}/>
                </div>
            </div>
        )
    }
}
export default Campaigns