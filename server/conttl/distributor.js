define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'distributor/index' + location.search,
                    add_url: 'distributor/add',
                    edit_url: 'distributor/edit',
                    del_url: 'distributor/del',
                    multi_url: 'distributor/multi',
                    import_url: 'distributor/import',
                    table: 'distributor',
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
                        // { checkbox: true },
                        { field: 'id', title: __('Id') },
                        { field: 'title', title: __('Title'), operate: 'LIKE' },
                        { field: 'code', title: __('Code'), operate: 'LIKE' },
                        { field: 'cmb_accnam', title: __('Cmb_accnam'), operate: 'LIKE' },
                        { field: 'cmb_accnbr', title: __('Cmb_accnbr'), operate: 'LIKE' },
                        { field: 'charge_percent', title: __('Charge_percent'), visible: Config.isAgent, operate: false },
                        { field: 'income', title: __('Income'), visible: !Config.isAgent, operate: false },
                        { field: 'cost_percent', title: __('Cost_percent'), visible: !Config.isAgent, operate: false },
                        { field: 'status', title: __('Status'), visible: !Config.isAgent, searchList: { "0": __('Status 0'), "1": __('Status 1') }, formatter: Table.api.formatter.toggle },
                        { field: 'createtime', title: __('Createtime'), operate: 'RANGE', addclass: 'datetimerange', autocomplete: false },
                        { field: 'operate', title: __('Operate'), visible: !Config.isAgent, table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate }
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        recyclebin: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    'dragsort_url': ''
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: 'distributor/recyclebin' + location.search,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        { checkbox: true },
                        { field: 'id', title: __('Id') },
                        { field: 'title', title: __('Title'), align: 'left' },
                        {
                            field: 'deletetime',
                            title: __('Deletetime'),
                            operate: 'RANGE',
                            addclass: 'datetimerange',
                            formatter: Table.api.formatter.datetime
                        },
                        {
                            field: 'operate',
                            width: '130px',
                            title: __('Operate'),
                            table: table,
                            events: Table.api.events.operate,
                            buttons: [
                                {
                                    name: 'Restore',
                                    text: __('Restore'),
                                    classname: 'btn btn-xs btn-info btn-ajax btn-restoreit',
                                    icon: 'fa fa-rotate-left',
                                    url: 'distributor/restore',
                                    refresh: true
                                },
                                {
                                    name: 'Destroy',
                                    text: __('Destroy'),
                                    classname: 'btn btn-xs btn-danger btn-ajax btn-destroyit',
                                    icon: 'fa fa-times',
                                    url: 'distributor/destroy',
                                    refresh: true
                                }
                            ],
                            formatter: Table.api.formatter.operate
                        }
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
