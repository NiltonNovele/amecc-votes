import { connectDB } from "@/lib/db";
import mongoose from "mongoose";

const VoteSchema = new mongoose.Schema({
  userId: String,
  candidate: String,
  timestamp: Date,
});

const Vote =
  mongoose.models.Vote || mongoose.model("Vote", VoteSchema);

export default async function AdminPage() {
  await connectDB();
  const votes = await Vote.find().lean();

  return (
    <div className="p-10 font-sans">
      <h1 className="text-3xl font-bold mb-6">Votes</h1>
      <div className="flex flex-col gap-4">
        {votes.map((v: any, i: number) => (
          <div key={i} className="p-4 bg-gray-100 rounded-lg border">
            <p><b>User:</b> {v.userId}</p>
            <p><b>Candidate:</b> {v.candidate}</p>
            <p><b>Time:</b> {new Date(v.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
