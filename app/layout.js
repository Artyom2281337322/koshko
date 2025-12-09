import './globals.css'

export const metadata = {
  title: 'Nekosia Gallery',
  description: 'Галерея с Nekosia API',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="bg-gray-900 text-white">
        {children}
      </body>
    </html>
  )
}