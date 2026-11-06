import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../lib/utils";
import "../../app/menu-hover-effects.css";

/** Supplied border/fill layers, with native links and existing menu behavior. */
export function MenuHoverLabel({ children }: { children: ReactNode }) {
  return (
    <span className="menu-hover-effect">
      <span className="menu-hover-label">{children}</span>
      <span className="menu-hover-borders" aria-hidden="true" />
      <span className="menu-hover-fill" aria-hidden="true" />
    </span>
  );
}
export default function NavMenu({
  children,
  className,
  ...props
}: ComponentProps<"nav">) {
  return (
    <nav className={cn("menu-hover-navigation", className)} {...props}>
      {children}
    </nav>
  );
}
