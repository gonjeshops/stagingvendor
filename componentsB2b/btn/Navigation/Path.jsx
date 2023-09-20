import React from 'react'

const Path = ({first, second, third, fourth, fifth}) => {
  return (
    <div>
        {`${first&&first} > ${second&&second} > ${third&&third} > ${fourth&&fourth} > ${fifth&&fifth} > ` }
    </div>
  )
}

export default Path