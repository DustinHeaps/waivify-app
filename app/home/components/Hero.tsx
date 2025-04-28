
import { useUser } from '@clerk/nextjs';
import { User } from '@prisma/client';
import { CopyLinkButton } from './CopyLinkButton';
import { QuickSetupTip } from './QuickSetupTip';

type Props = {
  dbUser: User | null
}

export const Hero = ({dbUser }: Props) => {
  const { user } = useUser();

  const publicLink = `https://waivify.com/${dbUser?.slug || 'your-link'}`;

  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-2xl font-semibold">Hey {user && user.firstName} 👋</h1>
        <QuickSetupTip />
        <p className="text-muted-foreground text-sm">
          Your waiver link is ready — share it with your clients to start collecting signatures!
        </p>
      </div>

      <div className="bg-muted p-3 rounded-xl flex items-center justify-between">
        <div className="text-sm truncate">{publicLink}</div>
        <CopyLinkButton link={publicLink} />
        {/* <button
          onClick={() => {
            navigator.clipboard.writeText(publicLink);
          }}
          className="text-xs font-medium border rounded-md px-3 py-1 hover:bg-primary hover:text-primary-foreground transition"
        >
          Copy Link
        </button> */}
      </div>
    </div>
  );
};
