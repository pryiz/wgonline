import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Twitch Quiz - Quiz interactif pour streamers',
  description: 'Organisez des quiz thématiques avec votre chat Twitch',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
        <script src="/test.js"></script>
      </body>
    </html>
  )
}
