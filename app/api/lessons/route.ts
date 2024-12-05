import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { lessons } from "@/db/schema";
import { isAdmin } from "@/lib/admin";

export const GET  = async () => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorizeed", { status: 403 });
  }

  const data = await db.query.lessons.findMany();

  const total = await db.query.lessons.findMany().then(lessons => lessons.length);

  const rangeHeader = `lessons 0-${data.length - 1}/${total}`;
  const response = NextResponse.json(data);
  response.headers.set('Content-Range', rangeHeader);

  return response;
};

export const POST  = async ( req: Request ) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorizeed", { status: 403 });
  }

  const body = await req.json();

  const data = await db.insert(lessons).values({
    ...body,
  }).returning();


  const total = await db.query.lessons.findMany().then(units => units.length);

  const rangeHeader = `lessons 0-${data.length - 1}/${total}`;
  const response = NextResponse.json(data[0]);
  response.headers.set('Content-Range', rangeHeader);

  return response;
};