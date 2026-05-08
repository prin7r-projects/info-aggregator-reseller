import * as React from "react";

/**
 * Annotedly Button — vendored from shadcn/ui then re-themed against Annotedly tokens
 * (square edges, ink fill, hairline border, no shadow). The marketing landing
 * mostly uses anchor-styled CTAs hand-authored inside section components; this
 * component is here so the SaaS app under /apps/app/ has the same primitive
 * once it forks open-saas.
 */
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline";
  size?: "md" | "sm";
};

const base =
  "inline-flex items-center justify-center font-sans font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:opacity-50 disabled:cursor-not-allowed";

const variantMap: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-ink text-paper hover:bg-oxblood",
  outline: "border border-ink text-ink hover:bg-ink hover:text-paper",
  ghost: "text-ink hover:bg-paper-2",
};

const sizeMap: Record<NonNullable<ButtonProps["size"]>, string> = {
  md: "px-6 py-3 text-[14px]",
  sm: "px-4 py-2 text-[13px]",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={[base, variantMap[variant], sizeMap[size], className].join(" ")}
      {...props}
    />
  ),
);
Button.displayName = "Button";
