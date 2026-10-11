/**
 * DropDown — disclosure menu for picking a search preset; closes on
 * selection, outside click, or Escape.
 */
'use client';
import { useEffect, useId, useRef, useState } from 'react';
import type { ChicagoPreset } from '@/app/lib/config/chicago.config';

interface DropDownProps {
  presets: ChicagoPreset[];
  onSelectPreset: (preset: ChicagoPreset) => void;
}

export default function DropDown({ presets, onSelectPreset }: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<ChicagoPreset | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (preset: ChicagoPreset) => {
    setSelectedPreset(preset);
    onSelectPreset(preset);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative text-2xl">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={menuId}
        className="font-crimson font-medium hover:text-red-600 underline underline-offset-4 cursor-pointer"
        onClick={() => setIsOpen((open) => !open)}>
        {selectedPreset?.label ?? 'Search Presets'}
      </button>
      {isOpen && (
        <ul
          id={menuId}
          className="absolute right-0 z-20 mt-2 min-w-full bg-black border border-gray-700 rounded-md py-2 font-crimson">
          {presets.map((preset) => (
            <li key={preset.id}>
              <button
                type="button"
                className="w-full text-left px-4 py-1 font-light hover:text-red-500 cursor-pointer whitespace-nowrap"
                onClick={() => handleSelect(preset)}>
                {preset.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
