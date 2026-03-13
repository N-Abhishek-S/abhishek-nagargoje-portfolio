"use client";

import { assetPath } from "../utils/assetPath";

const Avatar = () => {
  return (
    <div className="w-full h-full pointer-events-none select-none">
      <img
        src={assetPath("/avatar.png")}
        alt="Abhishek Nagargoje"
        className="w-full h-full object-cover object-top"
      />
    </div>
  );
};

export default Avatar;