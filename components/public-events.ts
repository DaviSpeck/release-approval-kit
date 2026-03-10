"use client";

type PublicEventPayload = Record<string, unknown>;

type TrackEventInput = {
  eventName: string;
  eventSource?: string;
  path: string;
  referrer?: string;
  payload?: PublicEventPayload;
};

export async function trackEvent(input: TrackEventInput) {
  try {
    await fetch("/api/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        eventName: input.eventName,
        eventSource: input.eventSource ?? "web_ui",
        path: input.path,
        referrer: input.referrer ?? (typeof document !== "undefined" ? document.referrer : ""),
        payload: input.payload ?? {}
      }),
      keepalive: true
    });
  } catch {
    // Best effort tracking only.
  }
}
