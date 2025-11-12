import React, { FC } from "react";
import Logo from "./Logo";
import { X } from "lucide-react";
import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: FC<SideMenuProps> = ({ isOpen, onClose }) => {
    const pathname = usePathname();
  return (
    <div
      className={`fixed inset-y-0 h-screen left-0 z-50 w-full bg-black/50 text-white/80 shadow-xl ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } hoverEffect`}
    >
      <div className="min-w-72 max-w-96 bg-black h-screen p-10 border-r border-r-red-700 flex flex-col gap-6">
        <div className="flex items-center justify-between gap-5">
          <Logo className="text-redColor" spanDesign="group-hover:text-white" />
          <button onClick={onClose} className="hover:text-red-600 hoverEffect">
            <X />
          </button>
        </div>
        <div className="flex flex-col space-y-3.5 font-semibold tracking-wide">
          {headerData.map((item) => (
            <Link
              href={item?.link}
              key={item?.title}
              className={pathname === item?.link ? "text-red-700 hoverEffect font-bold" : "hover:text-red-700 hoverEffect"}
            >
              {item?.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
