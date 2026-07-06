"use server"

import { db } from "@/lib/db"
import { clubResources, users } from "@/lib/db/schema"
import { desc, eq } from "drizzle-orm"

export async function getResources() {
  return db
    .select({
      id: clubResources.id,
      title: clubResources.title,
      url: clubResources.url,
      description: clubResources.description,
      createdAt: clubResources.createdAt,
      createdByName: users.name,
      createdById: clubResources.createdBy,
    })
    .from(clubResources)
    .innerJoin(users, eq(clubResources.createdBy, users.id))
    .orderBy(desc(clubResources.createdAt))
}
