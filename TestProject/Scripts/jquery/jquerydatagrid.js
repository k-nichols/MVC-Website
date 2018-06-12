$(document).ready(function () {

    /*$(function () {
        $('#loadPanel').dxLoadPanel({
            position: { of: '#dataGrid' },
            message: 'Loading...',
            height: 90,
            width: 222,
            visible: true,
            showIndicator: true,
            showPane: true
        });
    });*/

    //Creates a grid that displays subscriber information present in the Subscribers database
    $.getJSON('/Form/GetSubscribersData', function (data) {
        $('#dataGrid').dxDataGrid({
            dataSource: data,
            columns: [
               {
                   dataField: 'Email',
                   width: 230
               }, {
                   dataField: 'FirstName',
                   width: 130
               }, {
                   dataField: 'LastName',
                   width: 130
               }
            ],

            //Aesthetic settings:
            rowAlternationEnabled: true,
            showBorders: true,
            showRowLines: true,
            showColumnLines: false,

            //Functionality settings:
            filterRow: {
                visible: true
            },
            selection: {
                mode: 'multiple',
                showCheckBoxesMode: 'always'
            },
            editing: {
                mode: 'row',
                allowUpdating: true,
                allowDeleting: true,
                allowAdding: true
            },

            //Data altering functions:
            onRowRemoved: function (data) {
                alert(data);
                $.ajax({
                    type: 'POST',
                    url: '/Form/RemoveFromDatabase',
                    contentType: 'application/json; charset=utf-8',
                    data: data,
                    success: function (result) {
                        alert('Success');
                    },
                    error: function (result) {
                        console.log(result);
                    }
                });
            }

            //Return both non-changed and changed data
                //options.newData = $.extend({}, options.oldData, options.newData);
        });
    });

});