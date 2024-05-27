import { useDispatch, useSelector, useStore } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "@/lib/Store";

// Custom useDispatch hook with correct typings
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom useSelector hook with correct typings
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
