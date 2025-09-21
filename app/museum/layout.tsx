export default function MuseumLayout({
  children,
}: {
  //can include for eg header or footer here
  children: React.ReactNode;
}) {
  return <div className="max-w-4xl mx-auto">{children}</div>;
}
