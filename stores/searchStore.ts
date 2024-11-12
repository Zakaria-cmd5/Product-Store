import { createStore } from "zustand/vanilla";

export type SearchState = {
  searchTerm: string;
};

export type SearchAction = {
  setSearchTerm: (term: string) => void;
};

export type SearchStore = SearchState & SearchAction;

export const defaultInitState: SearchStore = {
  searchTerm: "",
  setSearchTerm: (term: string) => {
    defaultInitState.searchTerm = term;
  },
};

export const createSearchStore = (
  initState: SearchState = defaultInitState
) => {
  return createStore<SearchStore>((set) => ({
    ...initState,
    setSearchTerm: (term) => set({ searchTerm: term }),
  }));
};
