import React from "react"

const CategoryListTable = ({category})=>{
    return(
        <div style={{'overflowX':'auto', width: '100%'}}>
            <table>
                <thead>
                    <tr>
                        <th>S.N</th>
                        <th>Category Name</th>
                        <th>Min Product Weight</th>
                        <th>Min Product Size</th>
                        <th>Min Product Price</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {category.length > 0 ? category.map((item, id) => {
                        return( 
                            <tr key={id}>
                                <td>{id+1}.</td>
                                <td>{item.categoryName}</td>
                                <td>{item.minWeight}kg</td>
                                <td>{item.minSize}m</td>
                                <td>{item.minPrice}</td>
                                <td>
                                    <button className="success" onClick={()=> null}>Edit</button>
                                    <button className="cancel" onClick={()=> null}>Delete</button>
                                </td>
                            </tr>
                        )
                    }) : 'data not found'}
                </tbody>
            </table>
        </div>
    )
} 
export default CategoryListTable