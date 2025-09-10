import ContentHeader from "@/components/ContentHeader";
import EventsFeed from "@/components/LoopScroll";


export default function EventsPage() {
  return (
    <div className="max-w-lg mx-auto">
      <ContentHeader welcomeMsg="Discover what is happening around" newItemName="Event" />
      <EventsFeed />

    </div>
  );
}
