import Link from "next/link";
import React from "react";

const NavbarLink = ({ url, text }) => {
  return (
    <li className="">
      <Link href={url}>{text}</Link>
    </li>
  );
};

const Navbar = ({ links, logoUrl, logoText, linksBtn }) => {
  return (
    <header>
      <nav>
        <Link href="/">
          <img src={logoUrl} alt={logoText} />
        </Link>
        <ul>
          {links.map((item) => (
            <NavbarLink key={item.id} {...item} />
          ))}
          {linksBtn ? (
            <Link href={linksBtn.url} className={`btn btn-${linksBtn.type}`}>
              {linksBtn.text}
            </Link>
          ) : null}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
