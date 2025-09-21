'use client';

interface MuseumClientProps {
  initialData: any[];
}

export default function MuseumClient({ initialData }: MuseumClientProps) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Museum Data</h1>
      <ul className="space-y-2">
        {initialData.map((item: any, index: number) => (
          <li key={index} className="border p-4 rounded">
            <h2 className="font-semibold">{item.title}</h2>
            <p>{item.physicalDescription || 'No description available.'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
