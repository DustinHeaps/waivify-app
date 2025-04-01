import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { UTApi } from "uploadthing/server";
import { db } from "@/lib/prisma";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  signatureUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
      maxFileCount: 1,
    }
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth(req);
      const formData = await req.formData();
      const name = formData.get("name") as string;
      const date = formData.get("date") as string;

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return {
        userId: user.id,
        name,
        date,
        waiverId: formData.get("waiverId") as string,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.signature.create({
        data: {
          name: metadata.name,
          date: new Date(metadata.date),
          fileKey: file.key,
          waiver: {
            connect: {
              id: metadata.waiverId,
            },
          },
        },
      });

      return {
        uploadedBy: metadata.userId || "anon",
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

export const utapi = new UTApi();
