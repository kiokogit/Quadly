"use client";

import { PlusCircleIcon } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="max-w-lg mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Chats
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Chat with anyone here
      </p>

      {/* Create Section */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex">
          <PlusCircleIcon className="mr-4"/> Create
        </h2>
        
      </div>

      {/* Empty Discover Card */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-6 text-center text-gray-500 dark:text-gray-400">
        <p>No content yet. Start chatting!</p>
      </div>
    </div>
  );
}
