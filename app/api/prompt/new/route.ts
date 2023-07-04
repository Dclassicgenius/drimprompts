import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  //   const chunks = [];
  //   for await (let chunk of req.body) {
  //     chunks.push(chunk);
  //   }

  //   const body = Buffer.concat(chunks).toString();
  if (!request.body) {
    return new Response("Empty request body", { status: 400 });
  }

  const chunks = [];
  const reader = request.body.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    chunks.push(value);
  }

  const body = Buffer.concat(chunks).toString();

  const { userId, prompt, tag } = JSON.parse(body);

  try {
    await connectToDB();
    const newPrompt = new Prompt({ creator: userId, prompt, tag });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
