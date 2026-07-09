"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/** Shared press/hover feedback for anything clickable. */
export const press = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.97 },
  transition: { type: "spring", stiffness: 500, damping: 30 },
} as const;

export const MotionLink = motion.create(Link);
export const MotionA = motion.a;
export const MotionButton = motion.button;
