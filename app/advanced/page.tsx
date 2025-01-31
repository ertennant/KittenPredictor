"use client";

import Cat from '@/app/cat';
import GenotypeTable from '../components/genotype-table';

export default function AdvancedPredict() {
  // Use provided parent cat data to generate kittens. 
  function handleSubmit(event: any) {
    console.log(`called handleSubmit()`);
  }

  return (
    <form className="flex flex-row justify-around p-6" onSubmit={handleSubmit}>
      <GenotypeTable
        catName="Father" 
        catID="F"
      >
      </GenotypeTable>
      <GenotypeTable
        catName="Mother"
        catID="M"
      >
      </GenotypeTable>
    </form>
  )
}