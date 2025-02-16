import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../ui/sidebar";
import {
  IconArrowLeft,
  IconHome,
  IconBulb,
  IconPalette,
  IconFileText,
  IconPhone,
  IconTarget,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import Motivation from "../Motivation";
import logo from "../../img/TextlessLogo.png";

export default function NavMotivation() {
  const links = [
    {
      label: "Home",
      href: "/home",
      icon: (
        <IconHome className="text-light-primary dark:text-dark-primary h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Ideation",
      href: "/ideation",
      icon: (
        <IconBulb className="text-light-accent dark:text-dark-accent h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Branding",
      href: "/branding",
      icon: (
        <IconPalette className="text-light-secondary dark:text-dark-secondary h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Legal",
      href: "/legal",
      icon: (
        <IconFileText className="text-light-primary dark:text-dark-primary h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Marketing",
      href: "/marketing",
      icon: (
        <IconPhone className="text-light-secondary dark:text-dark-secondary h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Motivation",
      href: "/motivation",
      icon: (
        <IconTarget className="text-light-accent dark:text-dark-accent h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "/",
      icon: (
        <IconArrowLeft className="text-red-600 dark:text-red-400 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-light-background dark:bg-dark-background w-full flex-1 mx-auto border border-light-border dark:border-dark-border overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar
        open={open}
        setOpen={setOpen}
        className="bg-light-card dark:bg-dark-card shadow-lg"
      >
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "FounderFlow",
                href: "#",
                icon: (
                  <img
                    src="https://via.placeholder.com/50"
                    className="h-7 w-7 flex-shrink-0 rounded-full border border-light-border dark:border-dark-border"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Motivation />
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      to="#"
      className="flex items-center space-x-2 text-lg font-semibold text-light-text dark:text-dark-text"
    >
      <motion.img
        src={logo}
        className="h-8 w-8 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        alt="FounderFlow Logo"
      />
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        FounderFlow
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link to="#" className="flex items-center">
      <img src={logo} className="h-8 w-8 rounded-lg" alt="FounderFlow Logo" />
    </Link>
  );
};
