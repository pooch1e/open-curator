export default function SearchGridItem() {
  return (
    <ul className="col-span-4 col-start-1 flex flex-col gap-6 sm:col-span-12 md:gap-10">
      <li className="inline-block">
        <div className="relative motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in-out inline w-fit leading-none! bg-linear-to-r no-underline bg-bottom-left bg-no-repeat bg-size-[100%_1px] from-primary to-primary hover:from-highlight hover:to-highlight hover:text-highlight hover:bg-size-[0%_1px] motion-reduce:transition-none motion-reduce:hover:bg-size-[100%_1px] !h3 uppercase">
          test - this may be an anchor tag or link
        </div>
      </li>
    </ul>
  );
}
