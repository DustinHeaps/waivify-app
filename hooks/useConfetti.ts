
import confetti from "canvas-confetti";

export const useConfetti = () => {
  return () =>
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      scalar: 0.8,
      ticks: 200,
    });
};
