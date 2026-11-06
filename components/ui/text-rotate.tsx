"use client";

import {
  Fragment,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import type {
  AnimatePresenceProps,
  MotionProps,
  Transition,
} from "motion/react";
import { cn } from "../../lib/utils";

export interface TextRotateProps {
  texts: string[];
  rotationInterval?: number;
  initial?: MotionProps["initial"];
  animate?: MotionProps["animate"];
  exit?: MotionProps["exit"];
  animatePresenceMode?: AnimatePresenceProps["mode"];
  animatePresenceInitial?: boolean;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | number | "random";
  transition?: Transition;
  loop?: boolean;
  auto?: boolean;
  splitBy?: "words" | "characters" | "lines" | string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}
export interface TextRotateRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotionPreference(notify: () => void) {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
}
const readMotionPreference = () =>
  window.matchMedia(reducedMotionQuery).matches;
const serverMotionPreference = () => true;

function characters(text: string) {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    return Array.from(
      new Intl.Segmenter("en", { granularity: "grapheme" }).segment(text),
      (value) => value.segment,
    );
  }
  return Array.from(text);
}

/** Adapted from the client-supplied TextRotate component.
 * Static SSR/no-JS text remains visible; animations mount only after viewport entry.
 */
export const TextRotate = forwardRef<TextRotateRef, TextRotateProps>(
  function TextRotate(
    {
      texts,
      rotationInterval = 2000,
      initial = { y: "100%", opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: "-120%", opacity: 0 },
      animatePresenceMode = "wait",
      animatePresenceInitial = false,
      staggerDuration = 0,
      staggerFrom = "first",
      transition = { type: "spring", damping: 25, stiffness: 300 },
      loop = true,
      auto = true,
      splitBy = "characters",
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
    },
    ref,
  ) {
    const root = useRef<HTMLSpanElement>(null);
    const inView = useInView(root, { once: true, amount: 0.15 });
    const reduced = useSyncExternalStore(
      subscribeMotionPreference,
      readMotionPreference,
      serverMotionPreference,
    );
    const [hydrated, setHydrated] = useState(false);
    const [index, setIndex] = useState(0);
    useEffect(() => setHydrated(true), []);
    const enabled = hydrated && inView && reduced === false;
    const currentIndex = Math.min(index, Math.max(0, texts.length - 1));
    const currentText = texts[currentIndex] ?? "";
    const changeIndex = useCallback(
      (next: number) => {
        if (!texts.length) return;
        const clamped = Math.max(0, Math.min(next, texts.length - 1));
        if (clamped !== currentIndex) {
          setIndex(clamped);
          onNext?.(clamped);
        }
      },
      [texts.length, currentIndex, onNext],
    );
    const next = useCallback(
      () =>
        changeIndex(
          currentIndex === texts.length - 1
            ? loop
              ? 0
              : currentIndex
            : currentIndex + 1,
        ),
      [changeIndex, currentIndex, texts.length, loop],
    );
    const previous = useCallback(
      () =>
        changeIndex(
          currentIndex === 0 ? (loop ? texts.length - 1 : 0) : currentIndex - 1,
        ),
      [changeIndex, currentIndex, texts.length, loop],
    );
    const reset = useCallback(() => changeIndex(0), [changeIndex]);
    useImperativeHandle(
      ref,
      () => ({ next, previous, jumpTo: changeIndex, reset }),
      [next, previous, changeIndex, reset],
    );
    useEffect(() => {
      if (!auto || !enabled || texts.length < 2) return;
      const timer = window.setInterval(next, Math.max(1000, rotationInterval));
      return () => window.clearInterval(timer);
    }, [auto, enabled, texts.length, next, rotationInterval]);
    const words = useMemo(() => {
      const parts =
        splitBy === "characters" || splitBy === "words"
          ? currentText.split(" ")
          : currentText.split(splitBy === "lines" ? "\n" : splitBy);
      let offset = 0;
      return parts.map((word, wordIndex) => {
        const letters = splitBy === "characters" ? characters(word) : [word];
        const start = offset;
        offset += letters.length;
        return { letters, start, needsSpace: wordIndex !== parts.length - 1 };
      });
    }, [currentText, splitBy]);
    const total = words.reduce((count, word) => count + word.letters.length, 0);
    const delay = (position: number) => {
      const anchor =
        staggerFrom === "first"
          ? 0
          : staggerFrom === "last"
            ? total - 1
            : staggerFrom === "center"
              ? Math.floor(total / 2)
              : staggerFrom === "random"
                ? Math.floor(Math.random() * total)
                : staggerFrom;
      return Math.min(1, Math.abs(anchor - position) * staggerDuration);
    };
    return (
      <span
        ref={root}
        className={cn("text-rotate", mainClassName)}
        data-text-rotate
        data-text-motion={enabled ? "animated" : "static"}
      >
        <span className="text-rotate-accessible">{currentText}</span>
        {!enabled ? (
          <span aria-hidden="true" className="text-rotate-static">
            {currentText}
          </span>
        ) : (
          <AnimatePresence
            mode={animatePresenceMode}
            initial={animatePresenceInitial}
          >
            <motion.span
              className="text-rotate-visual"
              key={currentIndex}
              aria-hidden="true"
            >
              {words.map((word, wordIndex) => (
                <Fragment key={wordIndex}>
                  <span className={cn("text-rotate-word", splitLevelClassName)}>
                    {word.letters.map((letter, letterIndex) => (
                      <motion.span
                        key={letterIndex}
                        className={cn(
                          "text-rotate-element",
                          elementLevelClassName,
                        )}
                        initial={initial}
                        animate={animate}
                        exit={exit}
                        transition={{
                          ...transition,
                          delay: delay(word.start + letterIndex),
                        }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </span>
                  {word.needsSpace ? splitBy === "lines" ? <br /> : " " : null}
                </Fragment>
              ))}
            </motion.span>
          </AnimatePresence>
        )}
      </span>
    );
  },
);
TextRotate.displayName = "TextRotate";
