import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.css";

const DataTable = ({ data, columnsToShow }) => {
	const tableRef = useRef(null);

  useEffect(() => {
    if (tableRef.current) {
      // Détruire DataTables s'il existe déjà
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
      
      $(tableRef.current).DataTable({
        data: data,
        columns: columnsToShow.map((column) => ({ title: column, data: column })),
        paging: true,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: false,
        responsive: true,
        
      });
    }
  }, [data, columnsToShow]);

	return (
		<table ref={tableRef} className="display">
			<thead>
				<tr>
					{columnsToShow.map((column) => (
						<th key={column}>{column}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((item) => (
					<tr key={item.id}>
						{columnsToShow.map((column) => (
							<td key={column}>{item[column]}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default DataTable;
