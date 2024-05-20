import "./assets/stylesheet/base/index.css"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: '%s :: Trender',
    default: 'Trender',
  },
  description: "Trender Home",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}

