//collection data for container??
interface CollectionDataProps {
  id: number;
  title: string;
  image: string;
  link: string;
  // add more here as necessary
}
// !todo need to make the col start prop increase?
interface CollectionDataProps {
  collectionData: CollectionDataProps[];
}
export default function CollectionItem({
  collectionData,
} : CollectionDataProps) {
  return (
    <div className="h-40 w-40 border-2 col-start-1">
      <div className="flex flex-col">
        {collectionData.map((item) => {
          return (
            <div key={item.id}>
              <p>{item.title}</p>
              <p>{item.string}</p>
              <p>{item.link}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
