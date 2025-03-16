import { FC, ReactNode } from "react";
import Header from "../shared/Header";

interface DefaultLayoutProps {
  children: ReactNode;
}

//ajoue du header dans toute les pages

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <>
      <Header /> 
      {children}
      
    </>
  );
};

export default DefaultLayout;
