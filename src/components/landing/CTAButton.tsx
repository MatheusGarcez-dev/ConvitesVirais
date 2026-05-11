import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

/** Checkout Kiwify — usado em todos os CTAs da landing */
export const CHECKOUT_URL = "https://pay.kiwify.com.br/dJnzeQg";

interface CTAButtonProps {
  children: ReactNode;
  href?: string;
  size?: "md" | "lg";
  variant?: "primary" | "outline";
}

export function CTAButton({
  children,
  href = CHECKOUT_URL,
  size = "md",
  variant = "primary",
}: CTAButtonProps) {
  const sizeCls = size === "lg" ? "px-9 py-5 text-base" : "px-7 py-4 text-sm";
  const variantCls =
    variant === "primary"
      ? "bg-gradient-primary text-primary-foreground shadow-glow hover:scale-[1.02]"
      : "bg-card text-primary border border-primary/30 hover:bg-primary/5";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 ${sizeCls} ${variantCls}`}
    >
      <span>{children}</span>
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}
