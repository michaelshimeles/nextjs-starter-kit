"use client";
import { redirect } from "next/navigation";

export default function CustomLink({ children, href, ...props }: any) {
  return (
    <div onMouseDown={() => redirect(href)} {...props}>
      {children}
    </div>
  );
}
