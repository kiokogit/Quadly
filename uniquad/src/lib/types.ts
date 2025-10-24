
interface UserProfile {
  first_name: string;
  last_name: string;
  avatar: string;
}

interface EventExtraData {
  e_date: Date;
  location: string;
  venue: string
}

// Event data structure
interface Event {
  id: string;
  title: string;
  text: string;
  data: EventExtraData;
  author_id: string;
  likes_count?: number;
  comments_count?: number;
  interested_count?: number;
  created_at?: Date;
  category?: string;
  created_by?: UserProfile

}


interface LoaderState {
  loading: boolean
  message?: string
  showLoader: (msg?: string) => void
  hideLoader: () => void
}

interface EventPayload {
   title: string;
  text: string;
  data: EventExtraData;
  author_id: string
}


interface EventsState {
  events: Event[]
  error?: string

  fetchEvents: () => Promise<void>
  addEvent: (newEvent: EventPayload) => Promise<void>
}


