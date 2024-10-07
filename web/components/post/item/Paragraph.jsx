export default function Paragraph({ children }) {
  return (
    <div
      className="ce-paragraph cdx-block"
      dangerouslySetInnerHTML={{ __html: children }}
    ></div>
  );
}
