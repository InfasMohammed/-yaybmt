"use client";

import { TextRotate } from "./ui/text-rotate";

/** One reveal per paragraph, preserving the full original text and reading order. */
export default function ParagraphMotion({ text }: { text: string }) {
  return (
    <TextRotate
      texts={[text]}
      auto={false}
      animatePresenceInitial={true}
      loop={false}
      splitBy="words"
      staggerFrom="first"
      staggerDuration={0.012}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ type: "spring", damping: 30, stiffness: 400 }}
    />
  );
}
