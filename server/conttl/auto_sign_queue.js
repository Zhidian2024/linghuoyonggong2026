define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'auto_sign_queue/index' + location.search,
                    add_url: 'auto_sign_queue/add',
                    edit_url: 'auto_sign_queue/edit',
                    del_url: 'auto_sign_queue/del',
                    multi_url: 'auto_sign_queue/multi',
                    import_url: 'auto_sign_queue/import',
                    table: 'auto_sign_queue',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                // fixedColumns: true,
                // fixedRightNumber: 1,
                showExport: false,
                searchFormVisible: true,
                columns: [
                    [
                        { checkbox: true },
                        { field: 'id', title: __('Id') },
                        { field: 'company.title', title: __('Company.title'), operate: 'LIKE' },
                        { field: 'distributor.title', title: __('Distributor.title'), operate: 'LIKE' },
                        { field: 'nickname', title: __('Nickname'), operate: false },
                        { field: 'status', title: __('Status'), searchList: { "0": __('Status 0'), "1": __('Status 1'), "-1": __('Status -1') }, formatter: Table.api.formatter.status },
                        { field: 'result', title: __('Result'), operate: 'LIKE' },
                        { field: 'createtime', title: __('Createtime'), formatter: Table.api.formatter.datetime, operate: 'RANGE', addclass: 'datetimerange', }
                        // {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});
