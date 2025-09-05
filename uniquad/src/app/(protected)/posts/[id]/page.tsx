"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type User = {
    id: string;
    name: string;
    avatarUrl?: string;
};

type Comment = {
    id: string;
    author: User;
    content: string;
    createdAt: string;
};

type Post = {
    id: string;
    author: User;
    content: string;
    createdAt: string;
    imageUrl?: string;
    comments: Comment[];
};

async function getAllPostIds() {
  // Replace with your real data fetching logic
  return ["1", "2", "3"];
}

export async function generateStaticParams() {
  const ids = await getAllPostIds();
  return ids.map((id) => ({ id }));
}
async function fetchPost(id: string): Promise<Post> {
    // Replace with real API call
    return {
        id,
        author: { id: "1", name: "Jane Doe", avatarUrl: "" },
        content: "This is a sample campus post. Welcome to the thread!",
        createdAt: new Date().toISOString(),
        imageUrl: "",
        comments: [
            {
                id: "c1",
                author: { id: "2", name: "John Smith", avatarUrl: "" },
                content: "Great post!",
                createdAt: new Date().toISOString(),
            },
        ],
    };
}

export default function PostDetailPage() {
    const params = useParams();
    const postId = typeof params?.id === "string" ? params.id : Array.isArray(params?.id) ? params.id[0] : "";
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (postId) {
            fetchPost(postId).then((data) => {
                setPost(data);
                setLoading(false);
            });
        }
    }, [postId]);

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (!post) return <div className="p-8 text-center">Post not found.</div>;

    return (
        <div className="max-w-lg mx-auto py-6">
  <div className="rounded shadow p-6 mb-6">
    <div className="flex items-center mb-4">
      <img
        src={post.author.avatarUrl || "/avatar-placeholder.png"}
        alt={post.author.name}
        className="w-10 h-10 rounded-full mr-3"
      />
      <div>
        <div className="font-semibold text-gray-900 dark:text-gray-100">{post.author.name}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(post.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
    <div className="mb-4 text-gray-800 dark:text-gray-200">{post.content}</div>
    {post.imageUrl && (
      <img
        src={post.imageUrl}
        alt="Post"
        className="rounded max-h-96 object-cover mb-4"
      />
    )}
  </div>

  <div>
    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
      Comments
    </h2>
    <div className="space-y-4">
      {post.comments.length === 0 && (
        <div className="text-gray-500 dark:text-gray-400">No comments yet.</div>
      )}
      {post.comments.map((comment) => (
        <div
          key={comment.id}
          className="rounded p-4 flex"
        >
          <img
            src={comment.author.avatarUrl || "/avatar-placeholder.png"}
            alt={comment.author.name}
            className="w-8 h-8 rounded-full mr-3"
          />
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100">
              {comment.author.name}
            </div>
            <div className="text-sm text-gray-800 dark:text-gray-200">
              {comment.content}
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500">
              {new Date(comment.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

    );
}