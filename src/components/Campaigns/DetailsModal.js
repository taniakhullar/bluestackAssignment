import React from 'react'

class DetailsModal extends React.Component{
    constructor(){
        super()
    }
    render(){
        let {item} = this.props;
        return(
            <div class = 'modal'>
                <div class='modal-content'>
                    <div class='modalUpperDiv'>
                        <img class = 'modalImg' src={item.image_url}/>
                        <span class='detailNameText'>{item.name}</span><br></br>
                        <span class='detailCityText'>{item.region}</span>
                    </div>
                        <span class='modalPricingTxt'>Pricing</span>
                        <br></br>
                        <li  class='modalPricing'>
                            <span class='modalLiSpan'>1 Week - 1 Month</span>
                            <span class='modalLiValue'> ${item?.price}</span>
                        </li>
                        <li class='modalPricing'>
                            <span class='modalLiSpan'>6 Months</span>
                            <span class='modalLiValue'> ${item?.price * 5}</span>
                        </li>
                        <li class='modalPricing'>
                            <span class='modalLiSpan'>1 Year</span>
                            <span class='modalLiValue'> ${item?.price * 9}</span>
                        </li>
                    <button class='modalBtn' onClick={this.props.hideModal}>Close</button>
                </div>
            </div>
        )
    }
}

export default DetailsModal;