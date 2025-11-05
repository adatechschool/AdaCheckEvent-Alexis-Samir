import { createContext, useContext } from "react";

type PageManagerViewContextType = {
  currentPage: "home" | "favorites";
  setCurrentPage: React.Dispatch<React.SetStateAction<"home" | "favorites">>;
};

const PageManagerViewContext = createContext<PageManagerViewContextType | undefined>(undefined);

export const PageManagerViewProvider = PageManagerViewContext.Provider;

export function usePageManagerView() {
  const context = useContext(PageManagerViewContext);
  if (!context) {
    throw new Error("usePageManagerView must be used within a PageManagerViewProvider");
  }
  return context;
}