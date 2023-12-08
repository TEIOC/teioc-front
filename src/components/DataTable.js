import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.css";

const DataTable = ({ data, columnsToShow, columnTitles }) => {
    const tableRef = useRef(null);

    useEffect(() => {
        if (tableRef.current) {
            if ($.fn.DataTable.isDataTable(tableRef.current)) {
                $(tableRef.current).DataTable().destroy();
            }

            $(tableRef.current).DataTable({
                data: data,
                columns: columnsToShow.map(column => ({
                    title: columnTitles[column], // Utiliser le titre personnalisé
                    data: column
                })),
                paging: true,
                searching: true,
                ordering: true,
                info: true,
                autoWidth: false,
                responsive: true,
            });
        }
    }, [data, columnsToShow, columnTitles]); // Ajouter columnTitles aux dépendances

    return (
        <table ref={tableRef} className="display">
            <thead>
            <tr>
                {columnsToShow.map(column => (
                    <th key={column}>{columnTitles[column]}</th> // Utiliser le titre personnalisé
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

