function TableHeader({ columns, sortColumns, onSort }) {
    return (
        <thead>
            <tr>
                {columns.map(column => (
                    <th key={column.key} onClick={() => onSort(column.key)}>
                        {column.label}
                        {sortColumns[0].key === column.key && <span>{sortColumns[0].direction === 'asc' ? '🔼' : '🔽'}</span>}
                    </th>
                ))}
            </tr>
        </thead>
    );
}

export default TableHeader;