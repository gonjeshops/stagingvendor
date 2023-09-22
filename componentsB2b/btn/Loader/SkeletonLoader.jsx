import React from 'react'

const SkeletonLoader = () => {
  return (
	<div className="flex flex-col rounded w-full gap-4 animate-pulse">
		<div className="flex gap-4 w-full">
			<div className="w-20 h-20 bg-light200"></div>
			<div className="w-full h-20  bg-light200"></div>
		</div>
		<div className="flex gap-4 w-full">
			<div className="w-20 h-20 bg-light200"></div>
			<div className="w-full h-20  bg-light200"></div>
		</div>
		<div className="flex gap-4 w-full">
			<div className="w-20 h-20 bg-light200"></div>
			<div className="w-full h-20  bg-light200"></div>
		</div>
		<div className="flex gap-4 w-full">
			<div className="w-20 h-20 bg-light200"></div>
			<div className="w-full h-20  bg-light200"></div>
		</div>
		<div className="flex gap-4 w-full">
			<div className="w-20 h-20 bg-light200"></div>
			<div className="w-full h-20  bg-light200"></div>
		</div>
		
	</div>
  )
}
export default SkeletonLoader