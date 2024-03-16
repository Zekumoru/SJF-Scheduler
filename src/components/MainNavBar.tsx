import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

const MainNavItem = ({ children }: { children: ReactNode }) => {
  return (
    <li className="py-4 px-8 hover:bg-black cursor-pointer font-bold">
      {children}
    </li>
  );
};

const MainNavBar = () => {
  return (
    <nav className="bg-neutral-950" aria-label="main navigation">
      <ul className="flex max-w-screen-xl mx-auto flex-col md:flex-row">
        <Link to="/">
          <MainNavItem>Home</MainNavItem>
        </Link>
        <Link to="/sjf-scheduler">
          <MainNavItem>SJF Scheduler</MainNavItem>
        </Link>
        <Link to="/rr-scheduler">
          <MainNavItem>RR Scheduler</MainNavItem>
        </Link>
      </ul>
    </nav>
  );
};

export default MainNavBar;
