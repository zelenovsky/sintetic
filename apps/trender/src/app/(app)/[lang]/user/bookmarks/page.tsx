export default async function HomePage({
  params,
}: {
  params: {
    lang: string
  }
}) {
  return (
    <>
      <main className="container">
        <h1>Bookmarks</h1>
      </main>
    </>
  )
}
