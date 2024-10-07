export default function Header({ children, level }) {
  const parser = {
    1: <h1 className="ce-header">{children}</h1>,
    2: <h2 className="ce-header">{children}</h2>,
    3: <h3 className="ce-header">{children}</h3>,
    4: <h4 className="ce-header">{children}</h4>,
    5: <h5 className="ce-header">{children}</h5>,
    6: <h6 className="ce-header">{children}</h6>,
  };

  return <div className="ce-block__content">{parser[level]}</div>;
}
