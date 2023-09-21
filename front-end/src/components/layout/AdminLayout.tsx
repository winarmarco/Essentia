import React from "react";
import Sidebar from "@/components/page-components/admin/sidebar/Sidebar";
import "@/app/globals.css";


const AdminLayout: React.FC<{children: React.ReactNode}> = ({children}) => {

  return (
    <div className="relative min-h-screen overflow-hidden w-full grid grid-cols-[300px_1fr] grid-rows-[min-content_1fr]">
      <div className="px-10 py-8 border-r relative z-20 border-b">ESSENTIA</div>
      <main className="p-10 pt-20 row-span-2 overflow-auto">
        {children}
      </main>
      <div className="w-full">
        <Sidebar />
      </div>
    </div>
  );
};

export default AdminLayout;
