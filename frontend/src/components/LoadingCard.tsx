import Card from './Card'

export default function LoadingCard() {
  return (
    <Card>
      <div className="animate-pulse">
        <div className="w-full h-48 bg-gray-200 rounded-lg mb-4" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
    </Card>
  )
}
