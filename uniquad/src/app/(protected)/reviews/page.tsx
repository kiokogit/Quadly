import ContentHeader from "@/components/ContentHeader";


export const metadata = {
  title: "Reviews • UniQuad",
  description: "Provide useful feedback for your experience in your campus. How was the cafeteria? What is your opinion about an event?",
};


export default function ReviewPage() {
  return (
    <div className="max-w-lg mx-auto">
      <ContentHeader welcomeMsg="Reviews" newItemName="Review" />
    </div>
  );
}
