import IDirectory from "@/interfaces/IDirectory";
import IFile from "@/interfaces/IFile";
import "@/style/contextmenu.scss";

type SelectedItem = IFile | IDirectory;

const ContextMenu = ({
  rightClickItem,
  positionX,
  positionY,
  isToggled,
  buttons,
  contextMenuRef,
}: {
  rightClickItem: SelectedItem;
  positionX: number;
  positionY: number;
  isToggled: boolean;
  buttons: any;
  contextMenuRef: any;
}) => {
  return (
    <menu
      ref={contextMenuRef}
      style={{
        top: positionY - 54 + "px",
        left: positionX + 5 + "px",
      }}
      className={`context-menu ${isToggled ? "active-context-menu" : ""}`}
    >
      {buttons.map((button: any, index: number) => {
        function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
          e.stopPropagation();
          button.onClick(e, rightClickItem);
        }

        if (button.isSpacer) return <hr key={index}></hr>;

        return (
          <button
            onClick={handleClick}
            key={index}
            className="context-menu-button"
          >
            <span>{button.text}</span>
          </button>
        );
      })}
    </menu>
  );
};

export default ContextMenu;
