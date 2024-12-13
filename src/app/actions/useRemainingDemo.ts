import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export function useRemainingDemos() {
  const { data: session } = useSession();
  const [remainingDemos, setRemainingDemos] = useState<number | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    async function fetchRemainingDemos() {
      if (!session?.user?.email) return;

      try {
        const response = await fetch("/api/demo-count");
        const data = await response.json();
        setRemainingDemos(data.remaining);
      } catch (error) {
        console.error("Failed to fetch remaining demos:", error);
      }
    }

    fetchRemainingDemos();
  }, [session?.user?.email, refetchTrigger]);

  const refetch = () => setRefetchTrigger((prev) => prev + 1);

  return { remainingDemos, refetch };
}
