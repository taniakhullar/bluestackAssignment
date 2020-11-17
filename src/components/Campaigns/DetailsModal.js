import React from 'react'
import {English,German} from '../assets/languages'

class DetailsModal extends React.Component{
    constructor(){
        super()
    }
    render(){
        let {item,currLanguage} = this.props;
        let currLangObj = currLanguage === 'English' ? English : German;
        return(
            <div class = 'modal'>
                <div class='modal-content'>
                    <div class='modalUpperDiv'>
                        <img class = 'modalImg' src={item.image_url}/>
                        <span class='detailNameText'>{item.name}</span><br></br>
                        <span class='detailCityText'>{item.region}</span>
                    </div>
                        <span class='modalPricingTxt'>{currLangObj?.Pricing}</span>
                        <br></br>
                        <li  class='modalPricing'>
                            <span class='modalLiSpan'>1 {currLangObj?.Week} - {currLangObj?.Month}</span>
                            <span class='modalLiValue'> ${item?.price}</span>
                        </li>
                        <li class='modalPricing'>
                            <span class='modalLiSpan'>6 {currLangObj?.Month}</span>
                            <span class='modalLiValue'> ${item?.price * 5}</span>
                        </li>
                        <li class='modalPricing'>
                            <span class='modalLiSpan'>1 {currLangObj?.Year}</span>
                            <span class='modalLiValue'> ${item?.price * 9}</span>
                        </li>
                    <button class='modalBtn' onClick={this.props.hideModal}>{currLangObj?.Close}</button>
                </div>
            </div>
        )
    }
}

export default DetailsModal;