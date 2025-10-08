"use client";

import Image from "next/image";
import React, { useState } from "react";
import AddNewSessionDialog from "./AddNewSessionDialog";

function HistoryList() {
  const [historyList, setHistoryList] = useState([]);
  return (
    <div className="mt-10">
      {historyList.length == 0 ? (
        <div className=" flex flex-col justify-center items-center p-7 border-2 border-dashed rounded-2xl">
          <Image
            src={"/medical-assistance.png"}
            alt="Medical Assistant"
            width={150}
            height={150}
          />
          <h2 className="font-bold text-xl mt-2">No Recent Consultations</h2>
          <p>It looks like you haven't consulted with any doctor yet.</p>
          <AddNewSessionDialog />
        </div>
      ) : (
        <div>List</div>
      )}
    </div>
  );
}

export default HistoryList;
