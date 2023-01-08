import React, { useEffect, useState } from 'react'
import PriceMappingTable from './priceTable'
import WeightPriceForm from '../../containers/Admin/weightPriceForm'
import ModalLayout from './modal'

const WeightMapping = ()=>{
    const [weightPrice, setWeightPrice] = useState([])

    const fetchPrice = async()=>{
        const response = await fetch("http://localhost:5000/weight")
        const data = await response.json()

        if(data){
            setWeightPrice(data.priceDetail)
        }
    }

    useEffect(()=>{
        fetchPrice()
    }, [])

    return(
        <div>
            <div className='weight'>
                <h3>Weight Mapping</h3>
                <PriceMappingTable weightPrice={weightPrice}/>
            </div>
            <ModalLayout priceForm={WeightPriceForm} fetchPrice={fetchPrice}/>
        </div>
    )
}
export default WeightMapping