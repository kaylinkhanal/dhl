import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

const PriceMappingTable = (props) => {
    console.log(props)
    return (
        <table>
            <thead>
                <tr>
                    <th>S.N</th>
                    <th>Meters/Kg</th>
                    <th>Category</th>
                    <th>Price/unit</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {props.weightPrice ? props.weightPrice.map((item, id)=>{
                    return(
                        <tr key={item._id}>
                            <td>{id+1}</td>
                            <td>{item.productWeight}kg</td>
                            <td>{item.productType}</td>
                            <td>{item.unitPrice}</td>
                            <td>
                                <span><i><FontAwesomeIcon icon={faPen}/></i></span>
                                {/* <span><i><FontAwesomeIcon icon={faTrash}/></i></span> */}
                            </td>
                        </tr>
                    )
                }): 'loading'}
                
            </tbody>
        </table>
    )
}
export default PriceMappingTable