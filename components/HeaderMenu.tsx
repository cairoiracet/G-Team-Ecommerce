"use client";
import { headerData } from "@/constants/data";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const HeaderMenu = () => {
    const pathname = usePathname();
  return (
    <div className="hidden md:inline-flex w-1/3 items-center gap-7 text-sm capitalize font-semibold text-lightColor">
      {headerData.map((item) => (
        <Link
          key={item?.title}
          href={item?.link}
          className={`hover:text-red-700 hoverEffect relative group ${pathname === item?.link && "text-red-700"}`}
        >
          {item?.title}
          <span
            className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-redColor group-hover:w-1/2 hoverEffect group-hover:left-0 ${pathname === item?.link && "w-1/2"}`}
          />
          <span
            className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-redColor group-hover:w-1/2 hoverEffect group-hover:right-0 ${pathname === item?.link && "w-1/2"}`}
          />
        </Link>
      ))}
    </div>
  );
};

export default HeaderMenu;
