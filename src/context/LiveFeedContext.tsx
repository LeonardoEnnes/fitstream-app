import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { API_URL } from "@/lib/api";

export interface LiveEvent {
  id: string;
  timestamp: string;
  type: string;
  message: string;
}

interface LiveFeedContextData {
  liveFeed: LiveEvent[];
}

const LiveFeedContext = createContext<LiveFeedContextData>({} as LiveFeedContextData);

export function LiveFeedProvider({ children }: { children: ReactNode }) {
  const [liveFeed, setLiveFeed] = useState<LiveEvent[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(`${API_URL}/dashboard/live-feed`);

    eventSource.onmessage = (event) => {
      try {
        const newEvent: LiveEvent = JSON.parse(event.data);
        setLiveFeed((prevFeed) => {
          const updatedFeed = [newEvent, ...prevFeed];
          return updatedFeed.slice(0, 10);
        });
      } catch {
        console.error("Payload SSE malformado ignorado:", event.data);
      }
    };

    eventSource.onerror = () => {
      console.error("Conexão com o Live Feed perdida. O navegador tentará reconectar.");
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <LiveFeedContext.Provider value={{ liveFeed }}>
      {children}
    </LiveFeedContext.Provider>
  );
}

export function useLiveFeed() {
  return useContext(LiveFeedContext);
}