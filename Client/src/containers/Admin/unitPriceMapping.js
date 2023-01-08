import React from 'react'
import SizeMapping from '../../components/UnitPriceMapping/sizeMapping'
import WeightMapping from '../../components/UnitPriceMapping/weightMapping'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'

const UnitPriceMapping = ()=>{
    return(
        <section>
            <div className='container'>
                <h1 className='title'><i><FontAwesomeIcon icon={faCoins}/></i> Price Info</h1>
                <div className='mapping'>
                    <SizeMapping/>
                    <WeightMapping/>
                </div>
            </div>
        </section>
    )
}
export default UnitPriceMapping