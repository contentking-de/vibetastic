"use server"

import { db } from "@/lib/db"
import { clubDownloads, users } from "@/lib/db/schema"
import { desc, eq } from "drizzle-orm"

export async function getDownloads() {
  return db
    .select({
      id: clubDownloads.id,
      title: clubDownloads.title,
      description: clubDownloads.description,
      fileName: clubDownloads.fileName,
      fileSize: clubDownloads.fileSize,
      mimeType: clubDownloads.mimeType,
      blobUrl: clubDownloads.blobUrl,
      createdAt: clubDownloads.createdAt,
      uploadedByName: users.name,
    })
    .from(clubDownloads)
    .innerJoin(users, eq(clubDownloads.uploadedBy, users.id))
    .orderBy(desc(clubDownloads.createdAt))
}
