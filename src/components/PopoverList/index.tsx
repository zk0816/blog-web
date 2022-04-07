import { Categorty } from '@/common/interface';
import { Color } from '@/style/global';
import React from 'react'
import { NavLink } from 'react-router-dom';
import './index.less'

interface Props {
  data: Categorty[]
}

const PopoverList = ({data}: Props) => {
  console.log('first', data)
  return (
    <div className="popver">
      {data.map((e, index) => (
        <NavLink
          to={`/category/${e.categoryName}?${e.categoryId}`}
          key={`index_${index}`}
          style={(isActive) => ({ color: isActive ? Color.primaryColor : "#333333" })}
          activeStyle={{color: Color.primaryColor}}
        >
          {e.categoryName}
        </NavLink>
      ))}
    </div>
  );
}

export default PopoverList;