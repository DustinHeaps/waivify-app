import { useUser } from "@clerk/nextjs";

export type Step = {
  id: string;
  title: string;
  type: "quick" | "stretch";
  current?: number;
  goal?: number;
  completed: boolean;
};

export const useNextSteps = (): Step[] => {
  const { user } = useUser();
  const nextStepsMeta = (user?.publicMetadata?.nextSteps || {}) as Record<string, boolean>;
  const waiverCount = (user?.publicMetadata?.waiverCount || 0) as number;

  const steps: Step[] = [
    { id: "1", title: "Complete Getting Started", type: "quick", completed: !!nextStepsMeta["1"] },
    { id: "2", title: "Create your second waiver", type: "quick", completed: !!nextStepsMeta["2"] },
    { id: "3", title: "Leave feedback or request a feature", type: "quick", completed: !!nextStepsMeta["3"] },
    { id: "4", title: "Share via QR code", type: "quick", completed: !!nextStepsMeta["4"] },
    { id: "5", title: "Customize waiver design", type: "quick", completed: !!nextStepsMeta["5"] },
    { id: "6", title: "Export waivers as CSV", type: "quick", completed: !!nextStepsMeta["6"] },
    { id: "7", title: "Save a waiver template", type: "quick", completed: !!nextStepsMeta["7"] },
    { id: "8", title: "Download your first waiver", type: "quick", completed: !!nextStepsMeta["8"] },
    { id: "9", title: "Create 10 waivers", type: "stretch", current: waiverCount, goal: 10, completed: waiverCount >= 10 },
    { id: "10", title: "Create 25 waivers", type: "stretch", current: waiverCount, goal: 25, completed: waiverCount >= 25 },
    { id: "11", title: "Create 50 waivers", type: "stretch", current: waiverCount, goal: 50, completed: waiverCount >= 50 },
    { id: "12", title: "Create 100 waivers", type: "stretch", current: waiverCount, goal: 100, completed: waiverCount >= 100 },
  ];

  return steps;
};


