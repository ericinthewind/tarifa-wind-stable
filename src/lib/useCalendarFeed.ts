import { useEffect, useState } from "react";

export function getCalendarFeedUrl(): string {
  return new URL("tarifa-wind.ics", window.location.href).href;
}

export function getCalendarSubscribeUrl(feedUrl: string): string {
  return feedUrl.replace(/^https?:/, "webcal:");
}

export function useCalendarFeed() {
  const [feedUrl, setFeedUrl] = useState("");

  useEffect(() => {
    setFeedUrl(getCalendarFeedUrl());
  }, []);

  return {
    feedUrl,
    subscribeUrl: feedUrl ? getCalendarSubscribeUrl(feedUrl) : "",
  };
}
