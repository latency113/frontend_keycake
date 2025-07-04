import React from "react";

const TeamRadio = () => {
  return (
    <>

    <div className="flex justify-center">
      <div className="flex border p-2 gap-4 rounded-lg">
        <div>
          <input type="radio" />
          <label htmlFor="">แข่งขันทีม</label>
        </div>
        <div>
          <input type="radio" />
          <label htmlFor="">แข่งขันบุคคล</label>
        </div>
        <div>
          <input type="radio" />
          <label htmlFor="">ไม่แข่งขัน</label>
        </div>
      </div>
    </div>
    </>
  );
};

export default TeamRadio;
