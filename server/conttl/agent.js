define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'agent/index' + location.search,
                    add_url: 'agent/add',
                    edit_url: 'agent/edit',
                    del_url: 'agent/del',
                    multi_url: 'agent/multi',
                    import_url: 'agent/import',
                    table: 'agent',
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
                        { field: 'title', title: __('Title'), operate: 'LIKE' },
                        { field: 'distributors', title: '授权分包商个数', operate: false },
                        { field: 'balance', title: __('Balance'), operate: false },
                        { field: 'income', title: __('Income'), operate: false },
                        { field: 'status', title: __('Status'), searchList: { "1": __('Status 1'), "0": __('Status 0') }, formatter: Table.api.formatter.toggle },
                        { field: 'createtime', title: __('Createtime'), operate: 'RANGE', addclass: 'datetimerange', autocomplete: false },
                        { field: 'updatetime', title: __('Updatetime'), operate: 'RANGE', addclass: 'datetimerange', autocomplete: false },
                        { field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate }
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
