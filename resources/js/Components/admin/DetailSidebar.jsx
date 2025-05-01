import React, { createContext, useContext, useEffect, useState } from "react";

import Button from "./Button";

const DetailSidebarContext = createContext();

export function useDetailSidebar() {
  return useContext(DetailSidebarContext);
}

export function DetailSidebarProvider({ children }) {
  const [isDetailSidebarOpen, setDetailSidebarOpen] = useState(false);
  const [detailSidebarContent, setDetailSidebarContent] = useState({
    body: null,
    footer: null,
  });

  const openDetailSidebar = ({ body, footer = null }) => {
    setDetailSidebarContent({ body, footer });
    setDetailSidebarOpen(true);
  };

  const closeDetailSidebar = () => {
    setDetailSidebarOpen(false);
  };

  return (
    <DetailSidebarContext.Provider
      value={{
        isDetailSidebarOpen,
        openDetailSidebar,
        closeDetailSidebar,
        detailSidebarContent,
      }}
    >
      {children}
    </DetailSidebarContext.Provider>
  );
}

export default function DetailSidebar() {
  const { isDetailSidebarOpen, closeDetailSidebar, detailSidebarContent } =
    useDetailSidebar();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeDetailSidebar();
      }
    };
    if (isDetailSidebarOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDetailSidebarOpen]);

  if (!detailSidebarContent) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-20 transition-opacity duration-300 ${
        isDetailSidebarOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={closeDetailSidebar}
    >
      <div
        className={`fixed flex flex-col justify-between right-0 top-0 w-full sm:w-1/2 h-full bg-white shadow-lg transform transition-transform duration-300 ${
          isDetailSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <button
            className="text-4xl text-gray-600 hover:text-gray-800"
            onClick={closeDetailSidebar}
            aria-label="Close Sidebar"
          >
            &times;
          </button>
          <h1 className="font-secondary font-semibold tracking-wider uppercase text-xl">
            Detail
          </h1>
        </div>

        <div className="p-4 pb-20 flex-1 overflow-y-auto">
          {detailSidebarContent.body}
        </div>

        <div className="h-12 flex gap-2 items-center p-8 border-t">
          {detailSidebarContent.footer ? (
            detailSidebarContent.footer
          ) : (
            <>
              <Button onClick={closeDetailSidebar}>Close</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
