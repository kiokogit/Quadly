import ContentHeader from '@/components/ContentHeader';
import YouPage from '@/components/Home';

export const metadata = {
  title: "Home • UniQuad",
  description: "Find all featured content in your campus with utmost ease",
};

const ForYouPage: React.FC = () => {
  
  return (
    <div className='max-w-lg mx-auto space-y-10 border-b border-t border-r border-l border-gray-200 dark:border-gray-800 '>
       <ContentHeader welcomeMsg="Welcome to UniQuad" newItemName="Post" />
        <YouPage />

    </div>
  );
};

export default ForYouPage;
