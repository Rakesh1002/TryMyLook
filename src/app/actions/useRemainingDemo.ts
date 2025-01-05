import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

export function useRemainingDemos() {
  const { data: session } = useSession();
  const [remainingDemos, setRemainingDemos] = useState<number | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const fetchDemoCount = useCallback(async () => {
    if (!session?.user?.email) return;

    try {
      const response = await fetch("/api/demo-count");
      const data = await response.json();
      // console.log("Fetched remaining demos:", data.remaining);
      setRemainingDemos(data.remaining);
    } catch (error) {
      console.error("Failed to fetch remaining demos:", error);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    // console.log("useRemainingDemos: Fetching demo count..."); // Debug log
    fetchDemoCount();
  }, [fetchDemoCount, refetchTrigger]);

  const refetch = useCallback(() => {
    // console.log("Refetching demo count..."); // Debug log
    setRefetchTrigger((prev) => prev + 1);
  }, []);

  return {
    remainingDemos,
    refetch,
    updateCount: setRemainingDemos,
  };
}
