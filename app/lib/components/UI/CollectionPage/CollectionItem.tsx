//collection data for container??
interface CollectionDataProps {
  id: number;
  title: string | null;
  artist: string | null;
  date: string | null;
  culture?: string | null;
  medium?: string | null;
  department?: string | null;
  primaryimageurl?: string | null;
  objectURL?: string | null;
  images?: any[];
}
// !todo need to make the col start prop increase?
interface CollectionDataProps {
  collectionData: CollectionDataProps[];
}
export default function CollectionItem({
  collectionData,
}: CollectionDataProps) {
  return (
    <div className="h-40 w-40 border-2 col-start-1">
      <div className="flex flex-col">
        {collectionData.map((item) => {
          return <div>test</div>;
        })}
      </div>
    </div>
  );
}
