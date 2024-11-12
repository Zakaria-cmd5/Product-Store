"use client";

import { type SearchStore, createSearchStore } from "@/stores/searchStore";
import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

export type SearchStoreApi = ReturnType<typeof createSearchStore>;

export const SearchStoreContext = createContext<SearchStoreApi | undefined>(
  undefined
);

export interface Props {
  children: ReactNode;
}

export const SearchStoreProvider = ({ children }: Props) => {
  const storeRef = useRef<SearchStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createSearchStore();
  }

  return (
    <SearchStoreContext.Provider value={storeRef.current}>
      {children}
    </SearchStoreContext.Provider>
  );
};

export const useSearchStore = <T,>(selector: (store: SearchStore) => T): T => {
  const searchStoreContext = useContext(SearchStoreContext);

  if (!searchStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(searchStoreContext, selector);
};
