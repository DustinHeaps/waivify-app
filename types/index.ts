import { JsonValue } from "@prisma/client/runtime/library";

export type Waiver = {
  id: string;
  token: string | null;
  name: string | null;
  date: Date | null;
  ipAddress: string | null;
  terms: boolean | null;
  liability: boolean | null;
  viewedAt: Date | null;
  archived: boolean | null;
  userId: string | null;
  templateId: string | null;
  signature: {
    id: string;
    name: string;
    date: Date;
    waiverId: string;
    fileKey: string;
    uploadedAt: Date;
  } | null;
};

export type Post = {
  slug: string;
  title: string;
  author: string;
  description?: string;
  date: string;
  tags: string[];
  image: string;
  featured: boolean;
};
