"use client";

import Header from "./Header";
import Nav from "./Nav";
import TopLeftImg from "./TopLeftImg";

const Layout = ({ children }) => {
  return (
    <main className="page bg-site text-white bg-cover bg-no-repeat font-sans relative">
      <TopLeftImg />
      <Nav />
      <Header />
      {children}
    </main>
  );
};

export default Layout;