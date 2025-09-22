'use client'
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SearchGridContainer from './SearchGridContainer';
export default function SearchClient({ data }) {
  return (
    <>
      <div className="flex justify-center p-2">
        <SearchBar />
      </div>
      <SearchGridContainer />
    </>
  );
}
