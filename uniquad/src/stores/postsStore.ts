import { create } from "zustand"
import axiosInstance from "@/lib/api-client"
import { createPostEndpoint, getAllEventsPostsEndpoint } from "@/lib/endpoints"


export const useEventsStore = create<EventsState>((set, get) => ({
  events: [],
  loading: false,
  error: undefined,

  // ✅ Fetch events (auto-refresh support)
  fetchEvents: async () => {
    try {
      const res = await axiosInstance.get(getAllEventsPostsEndpoint)
      set({ events: res.data })
    } catch (err: any) {
      set({ error: err.message })
    } finally {
    }
  },

  addEvent: async (newEvent) => {
    try {
      await axiosInstance.post(createPostEndpoint, newEvent)
      await get().fetchEvents()
    } catch (err: any) {
      set({ error: err.message })
    }
  },

}))
