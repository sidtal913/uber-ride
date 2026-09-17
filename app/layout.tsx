import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uber Ride",
  description: "Montreal ride booking — API backend (UI owned by frontend hire)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
