import { Current } from '@/common/interface';
import { MyContext } from '@/components/Header';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import './index.less'

interface Props {
  data: Current[];
}

const List = ({data}: Props) => {
  const history = useHistory();
  return (
    <MyContext.Consumer>
      {(value) => (
        <div className="list">
          {data.map((e) => (
            <div
              className="title"
              key={e.artid}
              onClick={() => {
                value.setVisible(false);
                history.push({
                  pathname: `/article/${e.artid}`,
                });
              }
              }
            >
              {e.title}
            </div>
          ))}
        </div>
      )}
    </MyContext.Consumer>
  );
}

export default List;