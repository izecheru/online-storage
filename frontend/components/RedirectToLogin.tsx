"use client";
import { useAppSelector } from "@/lib/Store";
import { logout } from "@/state/UserSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function RedirectToLogin() {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user.isLogged || user.tokenExpired === true) {
      dispatch(logout());
      router.push("/");
    } else {
      router.push("/pages/root");
    }
  }, [dispatch, router, user.isLogged, user.tokenExpired]);
  return null;
}
