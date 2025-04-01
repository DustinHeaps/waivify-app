// 'use server';

// import { auth, clerkClient } from '@clerk/nextjs';

// export async function SaveButton(data: { name: string; logo: string }) {
//   const { userId } = auth(); 
//   if (!userId) throw new Error("Not authenticated");

//   const user = await clerkClient.users.getUser(userId); 

//   await clerkClient.users.updateUser(userId, {
//     publicMetadata: {
//         ...(user.publicMetadata || {}),
//       companyName: data.name,
//       logoUrl: data.logo,
//     },
//   });

//   return { success: true };
// }