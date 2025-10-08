import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import path from "path";
import React from "react";

const menuOptions = [
  {
    id: "1",
    name: "Home",
    path: "/home",
  },
  {
    id: "2",
    name: "History",
    path: "/history",
  },
  {
    id: "3",
    name: "Pricing",
    path: "/pricing",
  },
  {
    id: "4",
    name: "Profile",
    path: "/profile",
  },
];

function AppHeader() {
  return (
    <div className="w-full flex items-center p-4 shadow justify-between px-10 md:px-20 lg:px-40 py-5 ">
      <Image src="/logo.svg" alt="Logo" width={60} height={40} />
      <div className="hidden md:flex items-center gap-7">
        {menuOptions.map((options, index) => (
          <div key={index}>
            <h2 className="hover:font-bold cursor-pointer transition-all">
              {options.name}
            </h2>
          </div>
        ))}
      </div>
      <UserButton />
    </div>
  );
}

export default AppHeader;
