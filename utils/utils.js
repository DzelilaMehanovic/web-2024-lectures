var Utils = {
  datatable: function (table_id, columns, data) {
    if ($.fn.dataTable.isDataTable("#" + table_id)) {
      $("#" + table_id)
        .DataTable()
        .destroy();
    }

    $("#" + table_id).DataTable({
      data: data,
      columns: columns,
      pageLength: 5,
      lengthMenu: [2, 5, 10, 25, 50, "All"],
    });
  }
};