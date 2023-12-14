import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.css";
import { useNavigate } from "react-router-dom";

const DataTable = ({ data, columnsToShow, columnTitles }) => {
    const navigate = useNavigate();
    const tableRef = useRef(null);

    useEffect(() => {
        if (tableRef.current) {
            if ($.fn.DataTable.isDataTable(tableRef.current)) {
                $(tableRef.current).DataTable().destroy();
            }
            const dataTable = $(tableRef.current).DataTable({
                data: data,
                columns: columnsToShow.map(column => ({
                    title: columnTitles[column],
                    data: column
                })),
                paging: true,
                searching: true,
                ordering: true,
                info: true,
                autoWidth: false,
                responsive: true,
            });

            // Event listener for row clicks
            $(dataTable.table().body()).on('click', 'tr', function () {
                const rowData = dataTable.row(this).data();
                if (rowData) {
                    // Assuming `id` is the identifier of the survey
                    navigate(`/take-assessment/${rowData.id}`);
                }
            });
        }

        // Cleanup event listener on unmount
        return () => {
            if (tableRef.current) {
                $(tableRef.current).off('click');
            }
        };
    }, [data, columnsToShow, columnTitles, navigate]);

    return (
        <table ref={tableRef} className="display">
            <thead>
            <tr>
                {columnsToShow.map(column => (
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


