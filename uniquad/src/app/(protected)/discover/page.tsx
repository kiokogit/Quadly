import ContentHeader from "@/components/ContentHeader";
import ProductsFeed from "@/components/Discover";


export const metadata = {
  title: "Discover • UniQuad",
  description: "ENgage in the market place of everything, and discover life-changing products and services",
};


export default function DiscoverPage() {
  return (
    <div className="max-w-lg mx-auto">
     <ContentHeader welcomeMsg="Everything You need here..." newItemName="Listing"/>
     <ProductsFeed />
    </div>
  );
}
