define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'company_pay_order_detail/index' + location.search,
                    add_url: 'company_pay_order_detail/add',
                    edit_url: 'company_pay_order_detail/edit',
                    del_url: 'company_pay_order_detail/del',
                    multi_url: 'company_pay_order_detail/multi',
                    import_url: 'company_pay_order_detail/import',
                    table: 'company_pay_order_detail',
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
                        {field: 'company.title', title: __('Company.title'), operate: 'LIKE'},
                        {field: 'company_pay_order_id', title: __('Company_pay_order_id'), operate:'='},
                        {field: 'job.title', title: __('Job.title'), operate: 'LIKE'},
                        {field: 'nickname', title: __('Nickname'), operate: 'LIKE'},
                        {field: 'idnum', title: __('Idnum'), operate: 'LIKE'},
                        {field: 'bank_name', title: __('Bank_name'), operate: 'LIKE'},
                        {field: 'bank_city', title: __('Bank_city'), operate: 'LIKE'},
                        {field: 'bank_cardno', title: __('Bank_cardno'), operate: 'LIKE'},
                        {field: 'amount', title: __('Amount'), operate:'BETWEEN'},
                        {field: 'status', title: __('Status'), searchList: {"WAIT":__('Status wait'),"S":__('Status s'),"E":__('Status e'),"A":__('Status a')}, formatter: Table.api.formatter.status},
                        {field: 'yurref', title: __('yurref'), operate: '='},
                        {field: 'seq', title: __('seq'), operate: '='},
                        {field: 'reason', title: __('Reason'), operate: 'LIKE'},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false},
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
