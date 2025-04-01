// 'use server'

// import { clerkClient, auth } from "@clerk/nextjs";
// import { utapi } from "../api/uploadthing/core";

// export async function uploadFile(formData: FormData) {
//   const { userId } = auth();
//   if (!userId) throw new Error("Not authenticated");

//   const file = formData.get("file") as File;
//   if (!file) throw new Error("No file found");


//   const uploadPromise = utapi.uploadFiles(file);

 
//   const user = await clerkClient.users.getUser(userId);
//   const oldLogoUrl = user.publicMetadata.logoUrl as string | undefined;
//   const oldKey = oldLogoUrl?.split("/f/")[1];


//   if (oldKey) {
//     deleteOldFile(oldKey);
//   }

 
//   const uploaded = await uploadPromise;
//   const fileData = uploaded?.data;

//   if (!fileData?.url) throw new Error("Upload failed");

//   return fileData.url;
// }


// async function deleteOldFile(key: string) {
//   try {
//     await utapi.deleteFiles([key]);
//   } catch (err) {
//     console.warn("Initial delete failed, retrying in 1s...");
//     setTimeout(async () => {
//       try {
//         await utapi.deleteFiles([key]);
//         console.info("Old logo deleted on retry.");
//       } catch (finalErr) {
//         console.error("Delete retry failed:", finalErr);
//       }
//     }, 1000);
//   }
// }
