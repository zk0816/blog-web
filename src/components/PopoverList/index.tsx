import React from 'react'
import './index.less'

interface Props {
  data: string[]
}

const PopoverList = ({data}: Props) => {
  return (
    <div className='popver'>
      {data.map((e, index) => (
        <div key={`index_${index}`}>{e}</div>
      ))}
    </div>
  );
}

export default PopoverList;