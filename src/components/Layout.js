import { Outlet, useLocation } from 'react-router-dom';
import Footer from './footer';
import Header from './header'

const Layout = ({ hideHeaderPaths = [], isHeader, isFooter }) => {
  const { pathname } = useLocation();
  return (
    <>
      {!hideHeaderPaths.includes(pathname) && isHeader && <Header />}
      {!hideHeaderPaths.includes(pathname) && isFooter && <Footer />}
      <Outlet />
    </>
  );
}

export default Layout;