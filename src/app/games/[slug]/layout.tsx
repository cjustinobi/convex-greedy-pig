
export default function GameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className={`h-screen game-bg`}>
      <div className="md:px-custom p-custom-sm text-gray-500">
        {children}
      </div>
    </section>
  )
}
