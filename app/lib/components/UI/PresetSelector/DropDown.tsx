import {  useState } from 'react';
import type { DropDownProps, ChicagoPreset } from '@/app/lib/config/types';




export default function DropDown({ presets, onSelectPreset }: DropDownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedPreset, setSelectedPreset] = useState<ChicagoPreset | null>(
    null
  );


  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSelected = (preset: ChicagoPreset) => {
    setSelectedPreset(preset);
    onSelectPreset(preset);
    setOpen(false);
  };

  return (
    <div className="dropdown text-2xl ">
      <button
        className="hover:text-red-600 underline underline-offset-4 font-mono cursor-pointer"
        onClick={handleOpen}>
        {selectedPreset ? selectedPreset.label : 'Search Presets'}
      </button>
      {open ? (
        <ul className="menu font-crimson font-medium">
          {presets.map((item) => (
            <li
              key={item.id}
              className="menu-item hover:text-red-500 font-crimson font-light"
              onClick={() => handleSelected(item)}>
              <button>{item.label}</button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
