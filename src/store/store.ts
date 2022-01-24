import React from 'react';
import HeadStore from './headstore';

const storeContext = React.createContext({
  headStore: new HeadStore()
})
const useStores = () => React.useContext(storeContext);  // 利用 context hook
export default useStores;