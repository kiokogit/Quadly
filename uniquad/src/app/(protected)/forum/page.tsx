import ContentHeader from "@/components/ContentHeader";
import Feed from "@/components/ForumLoop";



export const metadata = {
  title: "Forum • UniQuad",
  description: "Lets talk about our campus, and all that can be said. Share Articles, posts, stories, and connect with friends and family",
};


export default function ForumPage() {
  return (
    <div className="max-w-lg mx-auto">
      <ContentHeader welcomeMsg="Read, Discover, Share, Invent" newItemName="Article"/>
      <Feed />
    </div>
  );
}
