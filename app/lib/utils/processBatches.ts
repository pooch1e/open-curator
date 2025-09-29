import { delay } from './delay';
export const processInBatches = async <T>(
  items: number[],
  batchSize: number,
  delayMs: number,
  handler: (id: number) => Promise<T>
): Promise<T[]> => {
  const results: T[] = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);

    const batchResults = await Promise.all(batch.map((id) => handler(id)));

    results.push(...batchResults.filter(Boolean));

    if (i + batchSize < items.length) {
      await delay(delayMs); 
    }
  }

  return results;
};
