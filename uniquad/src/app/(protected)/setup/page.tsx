import OnboardingFlow from "@/components/Onboarding";

export const metadata = {
  title: "Set up • UniQuad",
  description: "Onboarding for your account",
};

const Page: React.FC = () => {
  return (
    <div className='max-w-lg mx-auto space-y-12 border-t border-r border-l border-gray-200 dark:border-gray-800 '>
      <OnboardingFlow />

    </div>
  );
};

export default Page;


