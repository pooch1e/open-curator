import CollectionItem from './CollectionItem';

// !todo convert to useclient later
export default function CollectionContainer() {
  const testObject = [
    {
      id: 1,
      title: 'my gallery object',
      image: 'www.sjdkajsd.com',
      link: 'mylink.com',
    },
    {
      id: 2,
      title: 'my asd object',
      image: 'www.dfff.com',
      link: 'ffffff.com',
    },
  ];
  return (
    <section className="pt-6 md:pt-10 gap-6 md:gap-10">
      <div className="grid grid-cols-4 gap-x-4 sm:grid-cols-12 sm:gap-x-4 md:gap-x-4 lg:grid-cols-12 lg:gap-x-6">
        {/* map over items here */}
        <CollectionItem collectionData={testObject} />
      </div>
    </section>
  );
}
