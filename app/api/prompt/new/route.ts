import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextApiRequest } from "next";

export const POST = async (req: NextApiRequest) => {
  const chunks = [];
  for await (let chunk of req.body) {
    chunks.push(chunk);
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
