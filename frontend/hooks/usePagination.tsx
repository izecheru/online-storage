import { buttonsToShow, filesPerPage } from "@/constants";
import IFile from "@/interfaces/IFile";
import { useAppSelector } from "@/lib/Store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function usePagination(files: IFile[]) {
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleMenu, setVisibleMenu] = useState(false);

  // make sure to set page to 1 if we enter a folder
  const folder = useAppSelector((state) => state.folder);
  useEffect(() => {
    if (files.length > 0) {
      setVisibleMenu(true);
    } else {
      setVisibleMenu(false);
    }
    setCurrentPage(1);
  }, [files.length, folder.currentFolder.id]);

  const paginationMenu = () => {
    const menuElements = [];
    menuElements.push(
      <button
        className={`arrow-right ${currentPage === 1 ? "inactive" : ""} ${visibleMenu === false ? "inactive" : ""}`}
        onClick={() => {
          setCurrentPage(1);
        }}
      >
        <Image src="/skip.svg" width={30} height={30} alt="arrow" />
      </button>,
    );
    // here we push the first arrow for the pagination menu
    menuElements.push(
      <button
        className={`arrow-left ${visibleMenu === false ? "inactive" : ""}`}
        onClick={() => {
          // here we set the currentPage to currentPage--
          let previousPage = currentPage - 1;
          if (previousPage > 0) {
            setCurrentPage(previousPage);
          } else {
            toast.error(
              "Wow there, that's the first page. Where do you want to go???",
            );
          }

          return;
        }}
      >
        <Image
          src="/left-arrow-backup-2-svgrepo-com.svg"
          width={30}
          height={30}
          alt="arrow"
        />
      </button>,
    );

    menuElements.push(
      <div
        className={`pagination-button ${visibleMenu === false ? "inactive" : ""}`}
      >
        {currentPage}
      </div>,
    );

    menuElements.push(
      <button
        className={`arrow-right ${visibleMenu === false ? "inactive" : ""}`}
        onClick={() => {
          // here we set the currentPage to currentPage++
          let nextPage = currentPage + 1;
          if (nextPage < endPage) {
            setCurrentPage(nextPage);
          } else {
            toast.error(
              "Wow there, that's the last page. Where do you want to go???",
            );
          }
          return;
        }}
      >
        <Image
          src="/left-arrow-backup-2-svgrepo-com.svg"
          width={30}
          height={30}
          alt="arrow"
        />
      </button>,
    );

    menuElements.push(
      <button
        className={`arrow-left ${currentPage === totalPages ? "inactive" : ""} ${visibleMenu === false ? "inactive" : ""}`}
        onClick={() => {
          setCurrentPage(totalPages);
        }}
      >
        <Image src="/skip.svg" width={30} height={30} alt="arrow" />
      </button>,
    );

    return menuElements;
  };

  const menu = () => {
    const menu = [];
    const menuElements = paginationMenu();
    menu.push(<div className={`pagination-container`}>{menuElements}</div>);
    return menu;
  };

  // Calculate indices for pagination
  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;

  // Calculate current files based on pagination indices
  const currentFiles = files.slice(indexOfFirstFile, indexOfLastFile);

  // Calculate total number of pages
  const totalPages = Math.ceil(files.length / filesPerPage);

  // Calculate start and end page numbers for pagination buttons
  let startPage = Math.max(1, currentPage - Math.floor(buttonsToShow / 2));
  let endPage = Math.min(totalPages, startPage + buttonsToShow - 1);

  // Adjust start and end page numbers if not enough buttons are shown
  if (endPage - startPage + 1 < buttonsToShow) {
    startPage = Math.max(1, endPage - buttonsToShow + 1);
  }

  // Ensure that currentPage is within valid range
  const validatePageNumber = (pageNumber: number) => {
    return Math.min(Math.max(pageNumber, 1), totalPages);
  };

  // Function to paginate to a specific page
  const paginate = (pageNumber: number) => {
    setCurrentPage(validatePageNumber(pageNumber));
  };

  // Scroll to top when currentPage changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return {
    currentFiles,
    currentPage,
    totalPages,
    startPage,
    endPage,
    paginate,
    setCurrentPage,
    menu,
  };
}
