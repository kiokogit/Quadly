// Event data structure
export interface Event {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  title: string;
  content: string;
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
  maxAttendees?: number;
}