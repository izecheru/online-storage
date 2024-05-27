import INavItem from "./interfaces/NavItemInterface";
export const apiUrl = "http://localhost:8080/api";

export const filesPerPage = 35;
export const buttonsToShow = 10;
export const iconWidth = 30;
export const iconHeight = 30;
export const fileIconWidth = 70;
export const fileIconHeight = 70;

export const arrowWidth = 30;
export const arrowHeight = 30;

export const myDrive: INavItem = {
  text: "My Drive",
  href: "/pages/root",
  icon: "/drive-internet-media-svgrepo-com.svg",
  iconHeight: iconHeight,
  iconWidth: iconWidth,
};

export const sharedWithMe: INavItem = {
  text: "Shared with me",
  href: "/pages/shared-with-me",
  icon: "/folder-shared-svgrepo-com.svg",
  iconHeight: iconHeight,
  iconWidth: iconWidth,
};

export const contactNav: INavItem = {
  text: "Contact",
  href: "/pages/contact",
  icon: "/contact-book-svgrepo-com.svg",
  iconHeight: iconHeight,
  iconWidth: iconWidth,
};

export const settingsNav: INavItem = {
  text: "Settings",
  href: "/pages/settings",
  icon: "/settings-2-svgrepo-com.svg",
  iconHeight: iconHeight,
  iconWidth: iconWidth,
};

export const NavLinks: INavItem[] = [myDrive, sharedWithMe];
export const DownNavLinks: INavItem[] = [settingsNav, contactNav];
