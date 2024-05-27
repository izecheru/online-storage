"use client";
import Navbar from "@/components/Navbar";
import { RedirectToLogin } from "@/components/RedirectToLogin";
import TopActions from "@/components/TopActions";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-right" />
      <RedirectToLogin/>
        <Navbar/>
        <TopActions></TopActions>
        <div className="page-setup">
          {children}
        </div>
    </QueryClientProvider>
  );
}
