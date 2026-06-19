import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const publicDir = path.join(process.cwd(), "public");
    const filePath = path.join(publicDir, "resume.pdf");

    // Ensure public folder exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write file to disk
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      success: true,
      url: `/resume.pdf?t=${Date.now()}`,
      name: file.name,
      size: file.size,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const filePath = path.join(process.cwd(), "public", "resume.pdf");
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
  }
}
