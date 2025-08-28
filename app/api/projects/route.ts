import { connectToDB } from '@/lib/db';
import Project from '@/lib/models/Project';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectToDB();
  const projects = await Project.find();
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  await connectToDB();
  const body = await req.json();
  const { title, description, status, progress, team } = body;

  const newProject = await Project.create({ title, description, status, progress, team });
  return NextResponse.json(newProject, { status: 201 });
}
