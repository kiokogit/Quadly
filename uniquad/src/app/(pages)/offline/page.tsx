import Logo from "@/components/logo";

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-white dark:bg-gray-900">
        <Logo />
      <h1 className="text-2xl font-bold mb-4 text-orange-600">You’re Offline</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        It looks like you don’t have an internet connection.  
        Don’t worry — you can still browse content you’ve visited before.
      </p>
      <p className="text-sm text-gray-400">
        Please reconnect to fetch the latest updates.
      </p>
    </div>
  )
}
