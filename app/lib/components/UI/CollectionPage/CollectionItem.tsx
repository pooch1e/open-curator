//collection data for container??
interface CollectionItem {
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
interface CollectionItemProps {
  collectionData: CollectionItem;
}
export default function CollectionItem({
  collectionData,
}: CollectionItemProps) {
  console.log(collectionData, 'what am i in collection Item component');
  return (
    <div className="h-40 w-40 border-2 col-start-1">
      <div className="flex flex-col">
        <div>
          <h3>{collectionData.title}</h3>
          <p>{collectionData.artist}</p>
          <p>{collectionData.date}</p>
          {collectionData.primaryimageurl && (
            <img
              src={collectionData.primaryimageurl}
              alt={collectionData.title || 'Artwork'}
              className="w-full h-auto"
            />
          )}
        </div>
      </div>
    </div>
  );
}
