// "use client";
// import IDirectory from "@/interfaces/IDirectory";
// import IFile from "@/interfaces/IFile";
// import { useEffect, useState } from "react";

// type ItemProps = IFile[] | IDirectory[];

// type SortOptions = {
//   sortBy: string;
//   order: string;
//   filter: string;
// };

// function isFile(item: ItemProps): item is IFile[] {
//   return (
//     Array.isArray(item) && item.length > 0 && item[0].hasOwnProperty("fileSize")
//   );
// }

// export function useSort(items: ItemProps, sortOptions: SortOptions) {
//   const [sortedItems, setSortedItems] = useState<ItemProps>([]);

//   useEffect(() => {
//     let sorted = [...items];

//     // Sort items
//     if (sortOptions.sortBy === "name") {
//       sorted.sort((a, b) => a.name.localeCompare(b.name));
//     } else if (sortOptions.sortBy === "size" && isFile(items)) {
//       sorted.sort((a, b) => a.fileSize - b.fileSize);
//     }

//     // Apply additional filters if needed
//     if (sortOptions.filter === "filterCondition") {
//       // Apply your filter condition here
//       // Example: sorted = sorted.filter(item => item.someProperty === filterValue);
//     }

//     // Apply ascending or descending order
//     if (sortOptions.order === "desc") {
//       sorted.reverse();
//     }

//     setSortedItems(sorted);
//   }, []);

//   return sortedItems;
// }
