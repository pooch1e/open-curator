import { ReactNode, useEffect, useState } from 'react';

interface ChicagoPreset {
  id: string;
  label: string;
  sortField: string;
  description: string | null;
  searchTerm: string;
  category: 'sort' | 'content' | 'department' | 'medium';
}

interface DropDownProps {
  presets: ChicagoPreset[];
  onSelectPreset: (preset: ChicagoPreset) => void;
}

export default function DropDown({ presets, onSelectPreset }: DropDownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedPreset, setSelectedPreset] = useState<ChicagoPreset | null>(
    null
  );
  console.log(presets, 'in dropdown menu');

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSelected = (preset: ChicagoPreset) => {
    setSelectedPreset(preset);
    console.log(selectedPreset)
    onSelectPreset(preset);
    setOpen(false);
  };

  return (
    <div className="dropdown text-2xl">
      <button className="hover:text-red-300" onClick={handleOpen}>
        {selectedPreset ? selectedPreset.label : 'Search Presets'}
      </button>
      {open ? (
        <ul className="menu">
          {presets.map((item) => (
            <li
              key={item.id}
              className="menu-item hover:text-red-500"
              onClick={() => handleSelected(item)}>
              <button>{item.label}</button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
