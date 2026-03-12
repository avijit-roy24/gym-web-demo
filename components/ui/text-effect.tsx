"use client";

import type { TargetAndTransition } from "motion/react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

const initialProps: TargetAndTransition = {
  pathLength: 0,
  opacity: 0,
  scale: 0.7,
  rotateY: -15,
};

const animateProps: TargetAndTransition = {
  pathLength: 1,
  opacity: 1,
  scale: 1,
  rotateY: 0,
};

type Props = React.ComponentProps<typeof motion.svg> & {
  speed?: number;
  onAnimationComplete?: () => void;
};

function SamsungHelloVietnameseEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  return (
    <motion.svg
      className={cn("h-32", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1400 300"
      fill="none"
      stroke="currentColor"
      strokeWidth="20"
      initial={{ opacity: 1, scale: 0.8, rotateX: 10 }}
      exit={{ opacity: 0, scale: 0.6, rotateX: -10 }}
      transition={{ 
        duration: 0.8,
        type: "spring",
        stiffness: 120,
        damping: 15
      }}
      {...props}
    >
      <title>xin chào - Samsung Bold Tech Style</title>

      {/* x - Angular geometric X shape */}
      <motion.g>
        <motion.path
          d="M40 80L90 130L140 180"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.6),
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 300,
            damping: 20,
            opacity: { duration: 0.3 },
            scale: { duration: 0.5, type: "spring", stiffness: 200 },
          }}
        />
        <motion.path
          d="M140 80L90 130L40 180"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.6),
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: calc(0.2),
            type: "spring",
            stiffness: 300,
            damping: 20,
            opacity: { duration: 0.3, delay: calc(0.2) },
            scale: { duration: 0.5, delay: calc(0.2), type: "spring", stiffness: 200 },
          }}
        />
      </motion.g>

      {/* i - Tech vertical line with geometric dot */}
      <motion.g>
        <motion.path
          d="M200 90L200 180"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.5),
            ease: "easeOut",
            delay: calc(0.8),
            type: "spring",
            stiffness: 250,
            damping: 18,
            opacity: { duration: 0.3, delay: calc(0.8) },
            scale: { duration: 0.4, delay: calc(0.8) },
          }}
        />
        <motion.rect
          x="192"
          y="60"
          width="16"
          height="16"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={{ ...initialProps, pathLength: 1 }}
          animate={{ ...animateProps, pathLength: 1 }}
          transition={{
            duration: calc(0.3),
            delay: calc(1.2),
            type: "spring",
            stiffness: 400,
            opacity: { duration: 0.2, delay: calc(1.2) },
            scale: { duration: 0.3, delay: calc(1.2) },
          }}
        />
      </motion.g>

      {/* n - Angular tech style with sharp turns */}
      <motion.path
        d="M250 180L250 90L290 90L330 130L330 180"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.8),
          ease: "easeInOut",
          delay: calc(1.5),
          type: "spring",
          stiffness: 180,
          damping: 15,
          opacity: { duration: 0.4, delay: calc(1.5) },
          scale: { duration: 0.6, delay: calc(1.5) },
        }}
      />

      {/* c - Geometric C shape with sharp corners */}
      <motion.path
        d="M430 120L390 90L390 180L430 150"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.7),
          ease: "easeOut",
          delay: calc(2.3),
          type: "spring",
          stiffness: 220,
          damping: 16,
          opacity: { duration: 0.35, delay: calc(2.3) },
          scale: { duration: 0.5, delay: calc(2.3) },
        }}
      />

      {/* h - Bold Samsung tech H with angular connection */}
      <motion.g>
        <motion.path
          d="M520 60L520 180"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.5),
            ease: "easeOut",
            delay: calc(3.0),
            type: "spring",
            stiffness: 280,
            damping: 18,
            opacity: { duration: 0.3, delay: calc(3.0) },
            scale: { duration: 0.4, delay: calc(3.0) },
          }}
        />
        <motion.path
          d="M520 125L580 125"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.4),
            ease: "easeInOut",
            delay: calc(3.3),
            type: "spring",
            stiffness: 320,
            damping: 20,
            opacity: { duration: 0.25, delay: calc(3.3) },
            scale: { duration: 0.35, delay: calc(3.3) },
          }}
        />
        <motion.path
          d="M580 60L580 180"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.5),
            ease: "easeOut",
            delay: calc(3.6),
            type: "spring",
            stiffness: 280,
            damping: 18,
            opacity: { duration: 0.3, delay: calc(3.6) },
            scale: { duration: 0.4, delay: calc(3.6) },
          }}
        />
      </motion.g>

      {/* à - Geometric A with angular accent */}
      <motion.g>
        <motion.path
          d="M650 180L680 90L710 180"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.7),
            ease: "easeInOut",
            delay: calc(4.2),
            type: "spring",
            stiffness: 200,
            damping: 16,
            opacity: { duration: 0.35, delay: calc(4.2) },
            scale: { duration: 0.5, delay: calc(4.2) },
          }}
        />
        <motion.path
          d="M665 140L695 140"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.4),
            ease: "easeOut",
            delay: calc(4.6),
            type: "spring",
            stiffness: 250,
            damping: 18,
            opacity: { duration: 0.25, delay: calc(4.6) },
            scale: { duration: 0.35, delay: calc(4.6) },
          }}
        />
        {/* Angular accent mark */}
        <motion.path
          className="stroke-red-500"
          d="M700 50L720 30"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={{ ...initialProps, filter: "blur(3px)" }}
          animate={{ ...animateProps, filter: "blur(0px)" }}
          transition={{
            duration: calc(0.4),
            delay: calc(4.9),
            type: "spring",
            stiffness: 350,
            opacity: { duration: 0.3, delay: calc(4.9) },
            scale: { duration: 0.3, delay: calc(4.9) },
            filter: { duration: 0.6, delay: calc(4.9) },
          }}
        />
      </motion.g>

      {/* o - Geometric diamond-like O */}
      <motion.path
        d="M780 90L820 110L820 160L780 180L760 160L760 110L780 90"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.9),
          ease: "easeInOut",
          delay: calc(5.3),
          type: "spring",
          stiffness: 160,
          damping: 14,
          opacity: { duration: 0.45, delay: calc(5.3) },
          scale: { duration: 0.65, delay: calc(5.3) },
        }}
        onAnimationComplete={onAnimationComplete}
      />

      {/* Futuristic accent lines */}
      <motion.g className="stroke-red-600 opacity-60">
        <motion.path
          d="M50 50L1350 50"
          strokeWidth="2"
          style={{ strokeLinecap: "square" }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{
            duration: calc(2.0),
            delay: calc(6.0),
            ease: "easeOut",
          }}
        />
        <motion.path
          d="M50 220L1350 220"
          strokeWidth="2"
          style={{ strokeLinecap: "square" }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{
            duration: calc(2.0),
            delay: calc(6.2),
            ease: "easeOut",
          }}
        />
      </motion.g>
    </motion.svg>
  );
}

function SamsungHelloEnglishEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  return (
    <motion.svg
      className={cn("h-28", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1100 250"
      fill="none"
      stroke="currentColor"
      strokeWidth="18"
      initial={{ opacity: 1, scale: 0.8, rotateX: 8 }}
      exit={{ opacity: 0, scale: 0.6, rotateX: -8 }}
      transition={{ 
        duration: 0.7,
        type: "spring",
        stiffness: 140,
        damping: 18
      }}
      {...props}
    >
      <title>dream body - Bold Tech Style</title>

      {/* D */}
      <motion.g>
        <motion.path
          d="M40 60L40 190"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{ duration: calc(0.5), ease: "easeOut", type: "spring", stiffness: 280 }}
        />
        <motion.path
          d="M40 60L80 60L100 80L100 170L80 190L40 190"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{ duration: calc(0.6), ease: "easeInOut", delay: calc(0.2), type: "spring", stiffness: 320 }}
        />
      </motion.g>

      {/* R */}
      <motion.g>
        <motion.path
          d="M140 60L140 190"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{ duration: calc(0.5), ease: "easeOut", delay: calc(0.4), type: "spring", stiffness: 280 }}
        />
        <motion.path
          d="M140 60L180 60L200 80L200 110L180 130L140 130"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{ duration: calc(0.5), ease: "easeInOut", delay: calc(0.6), type: "spring", stiffness: 320 }}
        />
        <motion.path
          d="M180 130L200 190"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{ duration: calc(0.4), ease: "easeInOut", delay: calc(0.8), type: "spring", stiffness: 320 }}
        />
      </motion.g>

      {/* E */}
      <motion.g>
        <motion.path
          d="M240 60L240 190"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{ duration: calc(0.5), ease: "easeOut", delay: calc(1.0), type: "spring", stiffness: 260 }}
        />
        <motion.path
          d="M240 60L300 60"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{ duration: calc(0.4), ease: "easeInOut", delay: calc(1.2), type: "spring", stiffness: 300 }}
        />
        <motion.path
          d="M240 125L280 125"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{ duration: calc(0.4), ease: "easeInOut", delay: calc(1.4), type: "spring", stiffness: 300 }}
        />
        <motion.path
          d="M240 190L300 190"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{ duration: calc(0.4), ease: "easeInOut", delay: calc(1.6), type: "spring", stiffness: 300 }}
        />
      </motion.g>

      {/* A */}
      <motion.g>
        <motion.path
          d="M340 190L370 60L400 190"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{ duration: calc(0.6), ease: "easeOut", delay: calc(1.8), type: "spring", stiffness: 240 }}
        />
        <motion.path
          d="M355 140L385 140"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{ duration: calc(0.4), ease: "easeOut", delay: calc(2.0), type: "spring", stiffness: 240 }}
        />
      </motion.g>

      {/* M */}
      <motion.g>
        <motion.path
          d="M440 190L440 60L470 120L500 60L500 190"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{ duration: calc(0.7), ease: "easeOut", delay: calc(2.2), type: "spring", stiffness: 220 }}
        />
      </motion.g>

      {/* B */}
      <motion.g>
        <motion.path
          d="M580 60L580 190"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{ duration: calc(0.5), ease: "easeOut", delay: calc(2.4), type: "spring", stiffness: 260 }}
        />
        <motion.path
          d="M580 60L610 60L630 80L630 110L610 125L580 125"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{ duration: calc(0.5), ease: "easeInOut", delay: calc(2.6), type: "spring", stiffness: 300 }}
        />
        <motion.path
          d="M610 125L630 140L630 170L610 190L580 190"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{ duration: calc(0.5), ease: "easeInOut", delay: calc(2.8), type: "spring", stiffness: 300 }}
        />
      </motion.g>

      {/* O */}
      <motion.g>
        <motion.path
          d="M670 90L700 60L730 90L730 160L700 190L670 160L670 90"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{ duration: calc(0.8), ease: "easeInOut", delay: calc(3.0), type: "spring", stiffness: 180 }}
        />
      </motion.g>

      {/* D */}
      <motion.g>
        <motion.path
          d="M770 60L770 190"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{ duration: calc(0.5), ease: "easeOut", delay: calc(3.2), type: "spring", stiffness: 280 }}
        />
        <motion.path
          d="M770 60L810 60L830 80L830 170L810 190L770 190"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{ duration: calc(0.6), ease: "easeInOut", delay: calc(3.4), type: "spring", stiffness: 320 }}
        />
      </motion.g>

      {/* Y */}
      <motion.g>
        <motion.path
          d="M870 60L900 125L930 60"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{ duration: calc(0.6), ease: "easeOut", delay: calc(3.6), type: "spring", stiffness: 240 }}
        />
        <motion.path
          d="M900 125L900 190"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{ duration: calc(0.4), ease: "easeOut", delay: calc(3.8), type: "spring", stiffness: 240 }}
        />
      </motion.g>

      {/* Tech accent elements */}
      <motion.g className="stroke-red-600 opacity-70">
        {/* Corner brackets for tech aesthetic */}
        <motion.path
          d="M20 40L20 20L40 20"
          strokeWidth="3"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: calc(0.5), delay: calc(4.0), ease: "easeOut" }}
        />
        <motion.path
          d="M1020 40L1040 20L1040 40"
          strokeWidth="3"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: calc(0.5), delay: calc(4.2), ease: "easeOut" }}
        />
        <motion.path
          d="M20 210L20 230L40 230"
          strokeWidth="3"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: calc(0.5), delay: calc(4.4), ease: "easeOut" }}
        />
        <motion.path
          d="M1020 210L1040 230L1040 210"
          strokeWidth="3"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: calc(0.5), delay: calc(4.6), ease: "easeOut" }}
          onAnimationComplete={onAnimationComplete}
        />
      </motion.g>
    </motion.svg>
  );
}

export { SamsungHelloEnglishEffect, SamsungHelloVietnameseEffect };
