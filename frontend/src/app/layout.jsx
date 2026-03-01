import './globals.css'

export const metadata = {
  title: 'Emergency Action Planner',
  description: 'AI-powered emergency response planning',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
