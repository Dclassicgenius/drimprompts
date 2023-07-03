"use client";

import Form from "@components/Form";
import { FormEvent, useState } from "react";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const createPrompt = (e: FormEvent) => {};

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handlleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
