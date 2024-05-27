"use client";

import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { reduxStore } from "@/lib/Store";

persistStore(reduxStore);

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={reduxStore}>{children}</Provider>;
}
