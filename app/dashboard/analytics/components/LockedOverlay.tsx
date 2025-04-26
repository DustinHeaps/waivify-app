import { Lock } from "lucide-react"; 


type LockedOverlayProps = {
  text?: string;
};

export function LockedOverlay({ text = "Pro Feature" }: LockedOverlayProps) {
  return (
    <div className='absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm rounded-xl'>
      <Lock className='w-6 h-6 text-gray-500 mb-2' />
      <p className='text-sm font-semibold text-gray-600'>{text}</p>
    </div>
  );
}
