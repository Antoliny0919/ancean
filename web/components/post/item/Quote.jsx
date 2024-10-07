export default function Quote({ children }) {
  return (
    <div className="ce-block__content">
      <div
        className="cdx-quote"
        dangerouslySetInnerHTML={{ __html: children }}
      />
    </div>
  );
}
