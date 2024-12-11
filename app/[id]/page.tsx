export default async function Page({ params }: { params: { id: string } }) {
  const key = (await params).id
  return (
    <>{key}</>
  )
}