type RevealTitleProps = {
  text: string;
  id?: string;
  className?: string;
};

export default function RevealTitle({ text, id, className }: RevealTitleProps) {
  return (
    <h1 id={id} className={className}>
      {text.split("\n").map((line, index) => (
        <span key={line} className="reveal-mask">
          <span
            className="reveal-line"
            style={{ "--line-index": index } as React.CSSProperties}
          >
            {line}
          </span>
        </span>
      ))}
    </h1>
  );
}
