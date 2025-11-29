"use client";

import { PropsWithChildren } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "./button";

type SidebarButtonProps = {
  href: string;
} & PropsWithChildren;

function SidebarButton({ href, children }: SidebarButtonProps) {
  const pathName = usePathname();

  return (
    <Button
      variant={pathName === href ? "secondary" : "ghost"}
      className="justify-start gap-2"
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}

export { SidebarButton };
