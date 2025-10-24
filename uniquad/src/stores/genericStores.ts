import { create } from 'zustand'

export const useLoaderStore = create<LoaderState>((set) => ({
  loading: false,
  message: undefined,
  showLoader: (msg) => set({ loading: true, message: msg }),
  hideLoader: () => set({ loading: false, message: undefined }),
}))

export const loaderStore = {
  show: (msg?: string) => useLoaderStore.getState().showLoader(msg),
  hide: () => useLoaderStore.getState().hideLoader(),
}