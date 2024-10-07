import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children, currentPathName }) {
  // Pages to which the default layout will not apply
  const navbarExceptRoute = [
    '/posts/newpost',
    '/category',
    '/posts',
    '/member/signin',
  ];

  const footerExceptRoute = [
    '/posts/newpost',
    '/category',
    '/posts',
    '/member/signin',
  ];

  return (
    <>
      {navbarExceptRoute.includes(currentPathName) || (
        <Navbar currentPathName={currentPathName} />
      )}
      {children}
      {footerExceptRoute.includes(currentPathName) || <Footer />}
    </>
  );
}
