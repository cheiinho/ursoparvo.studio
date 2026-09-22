type Props = {
  caption: string;
  columns: readonly string[];
  rows: readonly (readonly string[])[];
  mark?: readonly string[];
};

export default function DataTable({ caption, columns, rows, mark }: Props) {
  return (
    <div className="intraday-table-wrap">
      <table className="intraday-table type-nota">
        <caption>{caption}</caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("|")} className={mark?.includes(row[0]) ? "is-marked" : undefined}>
              {row.map((cell, index) =>
                index === 0 ? (
                  <th key={cell} scope="row">
                    {cell}
                  </th>
                ) : (
                  <td key={`${row[0]}-${index}`}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
