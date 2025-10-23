
interface UserProfile {
  first_name: string;
  last_name: string;
  avatar: string;
}

interface EventExtraData {
  e_date: Date;
  location: string;
}

// Event data structure
interface Event {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  title: string;
  text: string;
  data: EventExtraData;
  e_date: Date;
  venue?: string;
  location?: string
  imageUrl?: string;
  likes_count: number;
  comments_count: number;
  interested_count: number;
  date_created: Date;
  isLiked: boolean;
  isAttending: boolean;
  verified?: boolean;
  category?: string;
  created_by?: UserProfile;
}
