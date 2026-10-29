define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'distributor_income_log/index' + location.search,
                    add_url: 'distributor_income_log/add',
                    edit_url: 'distributor_income_log/edit',
                    del_url: 'distributor_income_log/del',
                    multi_url: 'distributor_income_log/multi',
                    import_url: 'distributor_income_log/import',
                    table: 'distributor_income_log',
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
                        // {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'agent.title', title: __('Agent.title'), operate: 'LIKE'},
                        {field: 'distributor.title', title: __('Distributor.title'), operate: 'LIKE'},
                        {field: 'company.title', title: __('Company.title'), operate: 'LIKE'},
                        {field: 'money', title: __('Money'), operate:'BETWEEN'},
                        {field: 'before', title: __('Before'), operate:'BETWEEN'},
                        {field: 'after', title: __('After'), operate:'BETWEEN'},
                        {field: 'memo', title: __('Memo'), operate: 'LIKE'},
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
