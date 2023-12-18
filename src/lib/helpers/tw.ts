import { cx } from "class-variance-authority";
import { ClassValue } from "class-variance-authority/types";
import { twMerge } from "tailwind-merge";

/**
 * A helper function to merge tailwind classes
 * @param {ClassValue[]} classes
 * @returns {string} merged classes
 */
export const tw = (...classes: ClassValue[]): string => twMerge(cx(...classes));
