import React, { useState, useMemo, useEffect } from 'react';
import './DataTableStyles.css';


function ReactDataTable({
    data = [],
    columns = [],
    onRowClick = () => { },
    openModal = () => { },
    defaultEntriesPerPage = 10,
    sortColumn = 'name',
    sortOption = 'default'
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchColumn, setSearchColumn] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(defaultEntriesPerPage);
    const [sortColumns, setSortColumns] = useState([{ key: sortColumn, direction: 'neutral' }]);
    const [visibleColumns, setVisibleColumns] = useState(columns.map(col => col.key));
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    // Optimized Levenshtein distance algorithm to find similar strings
    const levenshteinDistance = (s, t, limit = Infinity) => {
        {
            let d = []; // 2d matrix

            // Early exit checks
            var n = s.length;

            var m = t.length;

            if (n === 0) return m;

            if (m === 0) return n;

            if (Math.abs(n - m) > limit) return limit + 1; //This line is added to the original algorithm, it allows to stop the algorithm if the difference between the two strings is too big

            // Initialize arrays
            for (let i = n; i >= 0; i--) d[i] = [];

            // Step 2, initialize cost of skipping prefix in String s to i.
            for (let i = n; i >= 0; i--) d[i][0] = i;
            for (let j = m; j >= 0; j--) d[0][j] = j;

            // Compute the Levenshtein distance
            for (let i = 1; i <= n; i++) {
                {
                    let s_i = s.charAt(i - 1);
                    for (let j = 1; j <= m; j++) {
                        {

                            // Early exit check for large distances
                            if (i === j && d[i][j] > limit) return n;

                            let t_j = t.charAt(j - 1);
                            let cost = (s_i === t_j) ? 0 : 1;

                            // Calculate the minimum
                            let mi = d[i - 1][j] + 1;
                            let b = d[i][j - 1] + 1;
                            let c = d[i - 1][j - 1] + cost;

                            if (b < mi) mi = b;
                            if (c < mi) mi = c;

                            d[i][j] = mi;



                            // Damerau transposition check and update
                            if (i > 1 && j > 1 && s_i === t.charAt(j - 2) && s.charAt(i - 2) === t_j) {
                                {
                                    d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
                                }
                            }
                        }
                    }
                }
            }
            // Return the calculated distance
            return d[n][m];
        }
    };


    //Search function
    const search = (name, items) => {
        const results = new Set();
        const searchTerms = name.toLowerCase().split(/\s+/);

        items.forEach(item => {
            let concatenatedData = '';
            columns.forEach(column => {
                if (searchColumn === 'all' || searchColumn === column.key) {
                    concatenatedData += ' ' + String(item[column.key]).toLowerCase();
                }
            });

            const dataSegments = concatenatedData.split(/\s+/);

            let allTermsFound = true;
            for (let term of searchTerms) {
                let termFound = false;
                for (let segment of dataSegments) {
                    if (segment.includes(term) || levenshteinDistance(term, segment) <= term.length * 0.3) {
                        termFound = true;
                        break;
                    }
                }
                if (!termFound) {
                    allTermsFound = false;
                    break;
                }
            }

            if (allTermsFound) {
                results.add(item);
            }
        });

        return Array.from(results);
    }


    //Filter data based on search term
    const filteredData = useMemo(() => {
        if (!searchTerm) return data;
        return search(searchTerm, data);
    }, [searchTerm, data, searchColumn]);

    //Sort data on individual columns
    const sortedData = useMemo(() => {
        let array = [...filteredData];
        if (sortColumns.length === 0) return array;
        // Multicolumn sorting to sort data based on multiple columns
        return array.sort((a, b) => {
            for (let sort of sortColumns) {
                if (sort.direction === 'neutral') continue;

                let result = sort.direction === 'asc'
                    ? String(a[sort.key]).localeCompare(String(b[sort.key]))
                    : String(b[sort.key]).localeCompare(String(a[sort.key]));
                if (result !== 0) return result;
            }
            return 0;
        });
    }, [filteredData, sortColumns]);


    //When header is clicked, sort data based on column whose header was clicked
    const handleHeaderClick = (columnKey) => {
        const existingIndex = sortColumns.findIndex(col => col.key === columnKey);
        if (existingIndex > -1) {
            const currentDirection = sortColumns[existingIndex].direction;
            const newDirection = currentDirection === 'asc' ? 'desc' : (currentDirection === 'desc' ? 'neutral' : 'asc');
            const newSortColumns = [...sortColumns];

            if (newDirection === 'neutral') {
                newSortColumns.splice(existingIndex, 1);
            } else {
                newSortColumns[existingIndex].direction = newDirection;
            }

            setSortColumns(newSortColumns);
        } else {
            setSortColumns([...sortColumns, { key: columnKey, direction: 'asc' }]);
        }
    };


    //Pagination constants to display data based on current page and the "entries per page" selected option
    const totalPages = Math.ceil(sortedData.length / entriesPerPage);
    const currentEntries = sortedData.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

    return (
        <div className="datatable-container">
            <div className="datatable-header">
                {/* Select menu to choose number of entries per page */}
                <label>Show entries:
                    <select value={entriesPerPage} onChange={(e) => setEntriesPerPage(Number(e.target.value))}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </label>
                {/* Search only in selected column or in all columns */}
                <label>Search Column:
                    <select value={searchColumn} onChange={(e) => setSearchColumn(e.target.value)}>
                        <option value="all">All</option>
                        {columns.map(column => (
                            <option key={column.key} value={column.key}>{column.title}</option>
                        ))}
                    </select>
                </label>
                <label>Search:
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </label>

                {/* Dropdown menu to Show/Hide Columns */}
                <div className="dropdown">
                    <label onClick={() => setDropdownOpen(!isDropdownOpen)}>Visible Columns</label>
                    {isDropdownOpen && (
                        <div className="dropdown-content">
                            {columns.map(column => (
                                <div key={column.key}>
                                    <input
                                        type="checkbox"
                                        checked={visibleColumns.includes(column.key)}
                                        onChange={() => {
                                            const newColumns = visibleColumns.includes(column.key)
                                                ? visibleColumns.filter(col => col !== column.key)
                                                : [...visibleColumns, column.key];
                                            setVisibleColumns(newColumns);
                                        }}
                                    />
                                    {column.title}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className='datatable-table-overflow-container'>
                <table>
                    {/* Sort data based on column whose header was clicked */}
                    <thead>
                        <tr>
                            {columns.filter(col => visibleColumns.includes(col.key)).map((column) => (
                                <th key={column.key} onClick={() => handleHeaderClick(column.key)}>
                                    {column.title}
                                    {sortColumns.some(sort => sort.key === column.key && sort.direction === 'asc') && <span className="sort-indicator asc"></span>}
                                    {sortColumns.some(sort => sort.key === column.key && sort.direction === 'desc') && <span className="sort-indicator desc"></span>}
                                </th>
                            ))}

                        </tr>
                    </thead>
                    {/* Display data based on current page and entries per page */}
                    <tbody>
                        {currentEntries.map((item) => (
                            <tr key={item.id} onClick={() => onRowClick(item)}>
                                {columns.filter(col => visibleColumns.includes(col.key)).map((column) => (
                                    <td key={column.key}>{item[column.key]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination menu */}
            <div className="datatable-pagination">
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>Previous</button>
                {`Showing ${Math.min((currentPage - 1) * entriesPerPage + 1, filteredData.length)} to ${Math.min(currentPage * entriesPerPage, filteredData.length)} of ${filteredData.length} entries`}
                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>Next</button>
                <button onClick={openModal} className='create-button'>Create</button>
            </div>
        </div>
    );
}

export default ReactDataTable;