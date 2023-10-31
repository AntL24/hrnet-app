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
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [searchColumn, setSearchColumn] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(defaultEntriesPerPage);
    const [sortColumns, setSortColumns] = useState([{ key: sortColumn, direction: 'asc' }]);
    const [visibleColumns, setVisibleColumns] = useState(columns.map(col => col.key));
    const [isDropdownOpen, setDropdownOpen] = useState(false);


    //Debounce search term
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);
        return () => {
            clearTimeout(timerId);
        };
    }, [searchTerm]);

    //Levenshtein distance algorithm to find similar strings
    const levenshteinDistance = (string1, string2) => {
        let distanceMatrix = [];
        for (let i = 0; i <= string1.length; i++) {
            distanceMatrix[i] = [i];
        }
        for (let j = 0; j <= string2.length; j++) {
            distanceMatrix[0][j] = j;
        }
        for (let i = 1; i <= string1.length; i++) {
            for (let j = 1; j <= string2.length; j++) {
                if (string1[i - 1] === string2[j - 1]) {
                    distanceMatrix[i][j] = distanceMatrix[i - 1][j - 1];
                } else {
                    distanceMatrix[i][j] = Math.min(
                        distanceMatrix[i - 1][j - 1] + 1,
                        distanceMatrix[i][j - 1] + 1,
                        distanceMatrix[i - 1][j] + 1
                    );
                }
            }
        }
        return distanceMatrix[string1.length][string2.length];
    }

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
        if (!debouncedSearchTerm) return data;
        return search(debouncedSearchTerm, data);
    }, [debouncedSearchTerm, data, searchColumn]);

    //Sort data on individual columns
    const sortedData = useMemo(() => {
        let array = [...filteredData];
        if (sortColumns.length === 0) return array;
        //Multicolumnn sorting to sort data based on multiple columns
        return array.sort((a, b) => {
            for (let sort of sortColumns) {
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
