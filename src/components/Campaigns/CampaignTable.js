import React from 'react'
import Calender from '../assets/Calender.png'
import File from '../assets/File.png'
import report from '../assets/report.png'
import BitMap from '../assets/Bitmap.png'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import Price from '../assets/Price.png'
import DetailsModal from './DetailsModal'

class CampaignTable extends React.Component{
    itemData= null;
    constructor(){
        super();
        this.state={
            showDatePicker: false,
            date: new Date(),
            showDetailsModal: false,
        }
    }
    // To convert timestamp into corresponding date,month,year
    getDate = (timestamp)=>{
        let months_arr = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        let theFullDate = new Date(timestamp);
        let theMonth = months_arr[theFullDate.getMonth()];
        let theYear = theFullDate.getFullYear();
        let theDate = theFullDate.getDate();
        return `${theMonth} ${theYear},${theDate}`;
    }
    // getting difference between event date and today's date
    getDayDifference = (timestamp)=>{
        let theFullDate = new Date(timestamp);
        let theDate = theFullDate.getDate();
        let todayDate = new Date().getDate();
        let theMonth = theFullDate.getMonth();
        let currMonth = new Date().getMonth();
        let theYear = theFullDate.getFullYear();
        let currYear = new Date().getFullYear();
        let diff = ((theYear -currYear)*365) +  ((theMonth-currMonth)* 30) + (theDate-todayDate);
        if(diff ===0)
        return 'Today'
        else if(diff>0)
        return `${diff} days ahead`
        else
        return `${Math.abs(diff)} days ago`
    }
    //when schdule campaign clicked ,show datepicker and set its position in front of row clicked
    openDatePicker = (item,e) =>{
        this.itemData = item;
        this.setState({showDatePicker: true})
        let elem = document.getElementById('datepicker')
        elem.style.position = 'absolute';
        elem.style.left = `${e.pageX}px`;
        elem.style.top = `${e.pageY+15}px`;
    }
    //close datepicker when user clicks on done button or anywhere(except datepicker) on screen
    closeDatePicker = () =>{
        let {date} = this.state;
        this.props.reArrangeTables(this.itemData,date)
        this.setState({showDatePicker: false})
    }
    // set value of date selected by user
    dateSelected = (e)=>{
        this.setState({date: e})
    }
    // show details modal when user clicks View Pricing
    showDetailsModal = (item)=>{
        this.itemData = item;
        this.setState({showDetailsModal:true})
    }
    // close modal when user clicks on close button in modal
    hideModal = ()=>{
        this.setState({showDetailsModal: false})
    }
    render(){
        let {data} = this.props;
        let {showDatePicker,date,showDetailsModal} = this.state;
        return(
            <div>
                <table>
                    <tbody>
                        <tr class='tableheader'>
                            <th></th>
                            <th>DATE</th>
                            <th>CAMPAIGN</th>
                            <th>VIEW</th>
                            <th>ACTION</th>
                            <th></th>
                        </tr>
                        {data.map((item)=>{
                                return (
                                    <tr>
                                        <td></td>
                                        <td>{this.getDate(item.createdOn)}<br></br>
                                        {this.getDayDifference(item.createdOn)}
                                        </td>
                                        <td>
                                            <img class = 'imageurl' src ={item.image_url} alt='image' />
                                            <span>{item.name}</span><br></br>
                                            <span>{item.region}</span>
                                        </td>
                                        <td onClick={()=>this.showDetailsModal(item)}>
                                            <img class = 'pricing' src={Price} ></img>
                                            <span>View Pricing</span></td>
                                        <td><img class = 'file' src ={File} alt='image'/>
                                            <label class='spangap'>CSV</label>
                                            <img class = 'statastics' src ={report} alt='image1'/>
                                            <label class='reportPadding'>Report</label>
                                            <span onClick={(e)=>this.openDatePicker(item,e)}>
                                            <img class = 'calender' src ={Calender} alt='image2' />
                                            <label >Schedule Again</label>
                                            </span>
                                        </td>
                                        <td></td>
                                    </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div id='datepicker'>
                    {showDatePicker ? <label ><DatePicker
                        selected={date}
                        onChange={(e)=>this.dateSelected(e)}
                        closeCalendar={false}
                        onClickOutside={this.closeDatePicker}>
                        <button onClick={this.closeDatePicker}>Done</button>
                    </DatePicker> 
                    </label>: null}
                    {showDetailsModal ? <DetailsModal item={this.itemData} hideModal={this.hideModal}/>: null}
                </div>
            </div>
        )
    }
}

export default CampaignTable;