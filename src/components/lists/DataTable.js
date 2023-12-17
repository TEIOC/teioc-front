// DataTable.js
import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.css";

const DataTable = ({ data, columnsToShow, columnTitles, onRowClick, redirectOnClick }) => {
    const tableRef = useRef(null);
    useEffect(() => {
        const dataTable = $(tableRef.current).DataTable({
            data: data,
            columns: columnsToShow.map((column) => ({
                title: columnTitles[column],
                data: column,
            })),
            paging: true,
            searching: true,
            ordering: true,
            info: true,
            autoWidth: false,
            responsive: true,
        });

        // Event listener for row clicks if redirectOnClick is true
        if (redirectOnClick) {
            $(dataTable.table().body()).on("click", "tr", function () {
                const rowData = dataTable.row(this).data();
                if (rowData) {
                    onRowClick(rowData.id);
                }
            });
        }

        // Cleanup event listener on unmount
        return () => {
            if ($.fn.DataTable.isDataTable(tableRef.current)) {
                if (redirectOnClick) {
                    $(dataTable.table().body()).off("click");
                }
                $(tableRef.current).DataTable().destroy();
            }
        };
    }, [data, columnsToShow, columnTitles, onRowClick, redirectOnClick]);

    return (
        <table ref={tableRef} className="display">
            <thead>
            <tr>
                {columnsToShow.map((column) => (
                    <th key={column}>{columnTitles[column]}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((item, rowIndex) => (
                <tr key={rowIndex}>
                    {columnsToShow.map((column, columnIndex) => (
                        <td key={`${rowIndex}-${columnIndex}`}>{item[column]}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default DataTable;







