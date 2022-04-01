import React from 'react';
import Content from '@/components/Content';

const Message: React.FC = () => {
  return (
    <div className="content">
      <Content
        title="记录成长  分享生活"
        subtitle="Taking notes life   Minutes live"
      />
      <div style={{ height: 1500 }}>1111</div>
    </div>
  );
}

export default Message;