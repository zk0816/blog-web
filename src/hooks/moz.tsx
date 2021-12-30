import React, { ReactNode, ComponentType, useContext, createContext } from 'react';

export interface StoreProviderProps {
  children: ReactNode;
}

export interface Store<V> {
  Provider: ComponentType<StoreProviderProps>;
  useStore: () => V;
}

export function createStore<V, State = void>(
  useHook: (initialState?: State) => V,
  initialState?: State,
): Store<V> {
  let Context = createContext<V | null>(null);

  function Provider(props: StoreProviderProps) {
    let value = useHook(initialState);
    return <Context.Provider value={value}>{props.children}</Context.Provider>;
  }

  function useStore(): V {
    let value = useContext(Context);
    if (value === null) {
      throw new Error('Component must be wrapped with <Provider>');
    }
    console.log('vvvv', value);
    return value;
  }

  return { Provider, useStore };
}

export function useStore<V>(store: Store<V>): V {
  return store.useStore();
}
