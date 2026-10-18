"use client";

import Link from "next/link";
import posthog from "posthog-js";
import type { ComponentProps } from "react";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  eventName: string;
  eventProperties?: Record<string, string>;
};

export function TrackedLink({
  eventName,
  eventProperties,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        posthog.capture(eventName, eventProperties);
        if (typeof onClick === "function") onClick(e);
      }}
    />
  );
}
