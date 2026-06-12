import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer'
import { SearchState } from '../types/types';

export const useArticleSearchStore = create<SearchState>()(
    immer((set) => ({
        searchValue: "",
        updateSearchValue: (value: string) =>
            set((state) => {
                state.searchValue = value
            }),
        clearSearchValue: () =>
            set((state) => {
                state.searchValue = ""
            })
    }))
)