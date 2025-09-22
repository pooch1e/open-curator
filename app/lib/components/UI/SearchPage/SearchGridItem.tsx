import './underline-animate.css';
export default function SearchGridItem() {
  return (
    <ul className="col-span-4 col-start-1 flex flex-col gap-6 sm:col-span-12 md:gap-10">
      <li className="inline-block p-2">
        <a
          href="#"
          className="relative inline-block text-lg uppercase no-underline underline-animate">
          test - this may be an anchor tag or link
        </a>
      </li>
    </ul>
  );
}
