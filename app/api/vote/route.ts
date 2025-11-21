import { connectDB } from "@/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

const VoteSchema = new mongoose.Schema({
  userId: String,
  candidate: String,
  timestamp: Date,
});

const Vote =
  mongoose.models.Vote || mongoose.model("Vote", VoteSchema);

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // Check if user already voted
    const exists = await Vote.findOne({ userId: body.userId });
    if (exists) {
      return NextResponse.json(
        { message: "User already voted" },
        { status: 409 }
      );
    }

    // Save vote
    await Vote.create(body);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
