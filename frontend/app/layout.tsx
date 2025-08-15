import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'sans-serif', margin: 20 }}>
        <h1>Admin Panel</h1>
        {children}
      </body>
    </html>
  );
}
