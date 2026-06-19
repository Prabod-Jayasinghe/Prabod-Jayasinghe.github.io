import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { personalInfo, aboutMe, experiences, projects, skills } from "@/lib/data";

const defaultData = {
  personalInfo,
  aboutMe,
  experiences,
  projects,
  skills,
};

const DB_FILE = path.join(process.cwd(), "data", "db.json");

// Helper to ensure database file exists
function ensureDb() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), "utf8");
  }
}

export async function GET() {
  try {
    ensureDb();
    const data = fs.readFileSync(DB_FILE, "utf8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error("GET /api/portfolio error:", error);
    return NextResponse.json({ error: "Failed to read database" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    ensureDb();
    const body = await request.json();
    fs.writeFileSync(DB_FILE, JSON.stringify(body, null, 2), "utf8");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/portfolio error:", error);
    return NextResponse.json({ error: "Failed to update database" }, { status: 500 });
  }
}

