import './globals.css'
import { Nunito} from 'next/font/google'

export const metadata = {
  title: 'K-Pop Database',
  description: 'A database to learn about various K-Pop group members',
}

const font = Nunito ({
  subsets: ['latin']
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
