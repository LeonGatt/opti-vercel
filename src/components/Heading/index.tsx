import { cn } from "@/utilities";
import type React from "react";

const sizes = {
  sm: "text-2xl",
  md: "text-3xl",
  lg: "lg:text-4xl text-3xl",
  xl: "lg:text-5xl text-3xl",
  xxl: "lg:text-6xl text-4xl",
};

export const tagsSizes: Record<Tag, string> = {
  h1: sizes.xl,
  h2: sizes.lg,
  h3: sizes.md,
  h4: sizes.sm,
  h5: sizes.sm,
  h6: sizes.sm,
};

type Size = keyof typeof sizes;
type Tag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface Props {
  children: React.ReactNode;
  className?: string;
  tag?: Tag;
  size?: Size;
}

export const Heading: React.FC<Props> = ({
  children,
  className,
  tag: Tag = "h2",
  size,
}) => {
  const sizeClass = size ? sizes[size] : tagsSizes[Tag];
  return (
    <Tag className={cn(sizeClass, className, "font-heading font-bold")}>
      {children}
    </Tag>
  );
};
