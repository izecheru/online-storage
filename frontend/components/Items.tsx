"use client";
import IDirectory from "@/interfaces/IDirectory";
import IFile from "@/interfaces/IFile";
import Item from "./Item";
import "@/style/contentContainer.scss";

type ItemProps = IDirectory[] | IFile[];
export default function Items({ items }: { items: ItemProps }) {
  return (
    <div className="folder-container">
      <ul className="unordered-list">
        {items &&
          items.map((item: IDirectory | IFile, index: number) => (
            <div key={index}>
              <Item item={item} />
            </div>
          ))}
      </ul>
    </div>
  );
}
