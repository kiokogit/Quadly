import ContentHeader from "@/components/ContentHeader";
import EventsFeed from "@/components/LoopScroll";


export const metadata = {
  title: "Events • UniQuad",
  description: "Discover LIfe changing events within and around your campus. Fro games, to latest meet ups of friends. Also, invite the whole campus to your event.",
};


export default function EventsPage() {
  return (
    <div className="max-w-lg mx-auto">
      <ContentHeader welcomeMsg="Discover what is happening around" newItemName="Event" />
      <EventsFeed />

    </div>
  );
}
