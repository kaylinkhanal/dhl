import React from 'react'
import { Skeleton } from 'antd'

const CardSkeletion = (props) => {
	return (
		Array(props.boxNumber).fill(0).map((item, id) => {
			return (
				<div key={id}>
					<div className='btns'>
						<button><Skeleton.Avatar active size={16} shape='circle' /></button>
						<button><Skeleton.Avatar active size={16} shape='circle' /></button>
					</div>
					<div className='loader order_item'>
						<div className='top'>
							<span className='badge'><Skeleton.Input active size='small' /></span>
							<span className='orderId'><Skeleton.Input active size='small' /></span>
							<span><Skeleton.Input active size="small" /></span>
						</div>
						<div className='bottom'>
							<ul>
								<li><Skeleton.Input active size={16} shape="round" /></li>
								<li><Skeleton.Input active size={16} shape="round" /></li>
								<li><Skeleton.Input active size={16} shape="round" /></li>
								<li><Skeleton.Input active size={16} shape="round" /></li>
								<li><Skeleton.Input active size={16} shape="round" /></li>
							</ul>
						</div>
					</div>
				</div>
			)
		})
	)
}
export default CardSkeletion
