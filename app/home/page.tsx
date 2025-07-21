import { getUserById } from "../actions/user";
import { HomePageContent } from "./components/HomePageContent";

export default async function HomePage() {
  const user = await getUserById();

  if (!user) return null;
  
  return <HomePageContent user={user} />;
}
