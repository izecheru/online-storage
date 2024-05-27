"use client";
import "@/style/navbar.scss";
import Link from "next/link";
import INavItem from "@/interfaces/NavItemInterface";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/lib/Store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  DownNavLinks,
  NavLinks,
  arrowHeight,
  arrowWidth,
  iconHeight,
  iconWidth,
} from "@/constants";
import {
  setAuthToken,
  setIsLogged,
  setRole,
  setUsername,
} from "@/state/UserSlice";
import useMyStore from "@/hooks/useMyStore";
import ProfileImage from "./ProfileImage";
import UserDetails from "./UserDetails";

const isActive = (path: string, pathname: string) => {
  return path === pathname || pathname.includes(path);
};

function NavItems({ navigationLinkList }: { navigationLinkList: INavItem[] }) {
  const pathname = usePathname();
  return (
    <ul className="nav-links">
      {navigationLinkList.map((link, index) => (
        <Link key={index} href={link.href} className="link-item">
          <li
            key={index}
            className={`list-item ${isActive(link.href, pathname) ? "active-link" : ""}`}
          >
            <Image
              className="nav-icon"
              alt="home"
              src={link.icon}
              width={link.iconWidth}
              height={link.iconHeight}
            />
            <p>{link.text}</p>
            <Image
              className={`${isActive(link.href, pathname) ? "arrow active" : "arrow"}`}
              alt="image"
              src="/left-arrow-backup-2-svgrepo-com.svg"
              width={arrowWidth}
              height={arrowHeight}
            />
          </li>
        </Link>
      ))}
    </ul>
  );
}

function Navbar() {
  const dispatch = useDispatch();
  const { user, userName, myProfileImage } = useMyStore();
  const logOut = () => {
    dispatch(setUsername(""));
    dispatch(setAuthToken(""));
    dispatch(setRole(""));
    dispatch(setIsLogged());
  };

  return (
    <div className="nav-wrapper">
      <nav className="sidenav-container">
        <UserDetails username={userName} profileImage={myProfileImage} />
        <NavItems navigationLinkList={NavLinks} />
        <NavItems navigationLinkList={DownNavLinks} />
        <ul className="nav-links">
          <div className="link-item logout" onClick={logOut}>
            <div className={"list-item"}>
              <Image
                className="nav-icon"
                alt="home"
                src="/logout.svg"
                width={iconWidth}
                height={iconHeight}
              />
              <p>Log out</p>
            </div>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
