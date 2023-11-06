function TableRow({ row, columns, onRowClick }) {
    return (
        <tr onClick={() => onRowClick(row)}>
            {columns.map(column => (
                <td key={column.key}>{row[column.key]}</td>
            ))}
        </tr>
    );
}

export default TableRow;