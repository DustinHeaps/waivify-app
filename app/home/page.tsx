import { getUserById } from '../actions/user';
import { HomePageContent } from "./components/HomePageContent";

export default async function HomePage() {
  const user = await getUserById();

  return <HomePageContent user={user!} />;
}
