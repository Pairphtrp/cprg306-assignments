import React from "react";

export const metadata = {
  title: "Shopping List",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="bg-gray-50 text-gray-900" suppressHydrationWarning={true}>
        <div>{children}</div>
      </body>
    </html>
  );
} 
