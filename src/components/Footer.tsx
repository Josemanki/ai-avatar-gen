import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-dark-gray flex h-24 items-center justify-between px-4 text-white lg:px-12">
      <div>© 2023 AI Avatar Generator</div>
      <ul className="flex flex-col lg:flex-row lg:space-x-6">
        <li>
          <Link href={"#"}>Privacy Policy</Link>
        </li>
        <li>
          <Link href={"#"}>Terms of Service</Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
