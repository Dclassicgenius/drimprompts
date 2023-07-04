"use client";

import { FormEvent, useEffect, useState } from "react";
import PromptCard from "./PromptCard";
export interface User {
  _id: string;
  email: string;
  username: string;
  image: string;
  __v: number;
}

export interface Prompt {
  _id: string;
  creator: User;
  prompt: string;
  tag: string;
  __v: number;
}

interface PromptCardListPrompt {
  data: Prompt[];
  handleTagClick: () => void;
}

const PromptCardList = ({ data, handleTagClick }: PromptCardListPrompt) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState<Prompt[]>([]);
  const handleSearchChange = (e: FormEvent) => {};
  //   const handleTagClick = () => {}

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
