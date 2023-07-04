import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest, { params }: any) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompt", { status: 500 });
  }
};

export const PATCH = async (request: NextApiRequest, { params }: any) => {
  const chunks = [];
  for await (let chunk of request.body) {
    chunks.push(chunk);
  }

  const body = Buffer.concat(chunks).toString();
  const { prompt, tag } = JSON.parse(body);

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update the prompt", { status: 500 });
  }
};

export const DELETE = async (request: NextRequest, { params }: any) => {
  await connectToDB();

  try {
    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt successfully deleted", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
