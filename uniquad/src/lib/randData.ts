// import { v4 as uuidv4 } from "uuid";

export interface Event {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  title: string;
  content: string;
  e_date: Date;
  venue?: string;
  location?: string;
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

// Helper for random integers
const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const campusEvents: Event[] = [
  {
    id: "ioei12nj-edae-ajdkjnea",
    userId: "kiokogit",
    userName: "Student Union",
    userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    title: "First Years’ Welcome Bash 🎉",
    content:
      "Join us for an unforgettable night welcoming the Class of 2025! Live music, food, and games await you.",
    e_date: new Date("2025-10-20T18:00:00"),
    venue: "Main Hall",
    location: "Campus Center",
    imageUrl: Math.random() > 0.7 ? `https://picsum.photos/600/300?random=${98}` : undefined,
    likes_count: rand(100, 400),
    comments_count: rand(10, 50),
    interested_count: rand(50, 200),
    date_created: new Date("2025-09-15T10:00:00"),
    isLiked: Math.random() > 0.5,
    isAttending: Math.random() > 0.5,
    verified: true,
    category: "Social",
    maxAttendees: 300,
  },
  {
    id: "ioei12nj-edae-ajdkjsanea",
    userId: "josepoo",
    userName: "Engineering Faculty",
    userAvatar: "https://randomuser.me/api/portraits/women/12.jpg",
    title: "Tech Innovators Conference",
    content:
      "Explore groundbreaking student projects and meet industry experts. Open to all faculties.",
    e_date: new Date("2025-11-10T09:00:00"),
    venue: "Innovation Hub",
    location: "Tech Park",
    imageUrl: Math.random() > 0.7 ? `https://picsum.photos/600/300?random=${90}` : undefined,
    likes_count: rand(80, 300),
    comments_count: rand(5, 30),
    interested_count: rand(60, 200),
    date_created: new Date("2025-09-25T14:00:00"),
    isLiked: Math.random() > 0.5,
    isAttending: Math.random() > 0.5,
    verified: true,
    category: "Academic",
    maxAttendees: 150,
  },
  {
    id: "ioei12nj-edae-ajdkjnea",
    userId: "wendy",
    userName: "Campus Music Club",
    userAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
    title: "Open Mic Night",
    content:
      "Show off your singing, poetry, or stand-up skills! Sign up early to secure a performance slot.",
    e_date: new Date("2025-10-28T19:00:00"),
    venue: "Student Lounge",
    location: "Arts Department",
    imageUrl: Math.random() > 0.7 ? `https://picsum.photos/600/300?random=${122}` : undefined,
    likes_count: rand(60, 250),
    comments_count: rand(5, 20),
    interested_count: rand(40, 180),
    date_created: new Date("2025-09-28T12:00:00"),
    isLiked: Math.random() > 0.5,
    isAttending: Math.random() > 0.5,
    verified: false,
    category: "Entertainment",
    maxAttendees: 120,
  },
  {
    id: "ioei12nj-edae-ajdkjnea",
    userId: "wendy",
    userName: "Graduating Class 2025",
    userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    title: "Graduation Gala Night 🎓",
    content:
      "A night to remember — dinner, dance, and celebration of achievements. Formal dress code required.",
    e_date: new Date("2025-12-15T18:30:00"),
    venue: "Grand Ballroom",
    location: "University Hotel",
    imageUrl: Math.random() > 0.7 ? `https://picsum.photos/600/300?random=${123}` : undefined,
    likes_count: rand(200, 600),
    comments_count: rand(20, 100),
    interested_count: rand(150, 400),
    date_created: new Date("2025-09-20T09:00:00"),
    isLiked: Math.random() > 0.5,
    isAttending: Math.random() > 0.5,
    verified: true,
    category: "Formal",
    maxAttendees: 500,
  },
  {
    id: "ioei12nj-edae-ajdkjnea",
    userId: "josepoo",
    userName: "Environmental Club",
    userAvatar: "https://randomuser.me/api/portraits/men/76.jpg",
    title: "Campus Clean-Up Day 🌿",
    content:
      "Join us in keeping our campus green and clean. All materials provided. Free T-shirts for volunteers!",
    e_date: new Date("2025-10-25T08:00:00"),
    venue: "Student Square",
    location: "Main Campus",
    imageUrl: Math.random() > 0.7 ? `https://picsum.photos/600/300?random=${12}` : undefined,
    likes_count: rand(50, 150),
    comments_count: rand(5, 25),
    interested_count: rand(30, 100),
    date_created: new Date("2025-09-18T15:00:00"),
    isLiked: Math.random() > 0.5,
    isAttending: Math.random() > 0.5,
    verified: true,
    category: "Community",
    maxAttendees: 200,
  },
];
