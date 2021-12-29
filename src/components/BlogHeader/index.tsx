import React from 'react';

const data = ['首页','说说','留言','相册','友链']

const Header = () => {
  return (
    <div>
      {data.map((value:string,index: number) => 
        <span key={`index-${index}`}>{value}</span>
      )}
    </div>
  )
}

export default Header;