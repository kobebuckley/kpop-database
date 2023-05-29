import Navbar from './components/navbar/Navbar'
import './globals.css'
import { Nunito} from 'next/font/google'

import ClientOnly from './components/ClientOnly'
import RegisterModal from './components/modals/RegisterModal'



export const metadata = {
  title: 'Kpop Database',
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
      <body className={font.className}>
        <ClientOnly>
          <RegisterModal />
          <Navbar /> 
        </ClientOnly>
        {children}
        </body>
    </html>
  )
}
