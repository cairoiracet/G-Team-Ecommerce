import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Logo = ({ className, spanDesign }: { className?: string, spanDesign?:string }) => {
  return (
  <Link href="/" className="group">
      <h2
        className={cn(
          "text-2xl text-redColor font-black tracking-wider uppercase hover:text-black hoverEffect",
          className
        )}
      >
        G-Team
        <span className={cn("text-black group-hover:text-redColor hoverEffect pl-2xt-lg ml-1 font-semibold", spanDesign)}>
          Store
        </span>
      </h2>
    </Link>
  );
};

export default Logo;
