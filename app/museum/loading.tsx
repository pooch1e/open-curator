export default function Loading() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Loading Museum Data...
      </h1>
      <ul className="space-y-2">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <li
              key={index}
              className="border p-4 rounded bg-gray-200 h-24"></li>
          ))}
      </ul>
    </div>
  );
}
