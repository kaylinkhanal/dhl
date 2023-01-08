import React, { useEffect, useState } from 'react'
import PriceMappingTable from './priceTable'
import SizePriceForm from '../../containers/Admin/sizePriceForm'
import ModalLayout from './modal'

const SizeMapping = ()=>{
    const [sizePrice, setSizePrice] = useState([])

    const fetchPrice = async()=>{
        const response = await fetch("http://localhost:5000/size")
        const data = await response.json()

        if(data){
            setSizePrice(data.priceDetail)
        }
    }

    useEffect(()=>{
        fetchPrice()
    }, [])
    
    return(
        <div>
            <div className='size'>
                <h3>Size Mapping</h3>
                <PriceMappingTable  sizePrice={sizePrice}/>
            </div>
            <ModalLayout priceForm={SizePriceForm}  fetchPrice={fetchPrice}/>
        </div>
        
    )
}
export default SizeMapping