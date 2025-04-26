import { getUserById } from "../actions/user";
import { PricingContent } from "./components/PricingContent";

export default async function PricingPage() {
  const dbUser = await getUserById();

  if (!dbUser) return 

  return <PricingContent user={dbUser} />;
}
