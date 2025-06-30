import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <Link
          href="/dashboard"
          className="flex items-center justify-center "
        >
          <button className="bg-blue-500 cursor-pointer text-white text-lg px-8 py-5 rounded-xl shadow-md transition duration-150 ease-in-out hover:bg-blue-600 hover:scale-105 active:scale-95 focus:outline-none">
            หน้ารายงานผล
          </button>
        </Link>
      </div>
    </>
  );
};

export default page;
