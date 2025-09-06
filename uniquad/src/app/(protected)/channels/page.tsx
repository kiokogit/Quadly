
export default function ChatPage() {
  return (
    <div className="max-w-lg mx-auto px-4 pt-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Channels List
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Access groups and channels for everyone, except class channels
      </p>
       {/* Coming soon alert */}
      <div className="text-sm font-medium text-orange-600 dark:text-orange-400 text-center mt-9">
        🚧 Coming soon...
      </div>

    </div>
  );
}
