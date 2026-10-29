define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'company_balance_log/index' + location.search,
                    add_url: 'company_balance_log/add',
                    // edit_url: 'company_balance_log/edit',
                    // del_url: 'company_balance_log/del',
                    // multi_url: 'company_balance_log/multi',
                    // import_url: 'company_balance_log/import',
                    table: 'company_balance_log',
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
                        { field: 'company.title', title: __('Company.title'), operate: 'LIKE' },
                        { field: 'company_pay_order_id', title: __('Company_pay_order_id') },
                        { field: 'cmb_refnbr', title: __('Cmb_refnbr'), operate: '=' },
                        { field: 'money', title: __('Money'), operate: false, formatter: function (data) {
                            if(data > 0) {
                                return '<span class="text-success">' + data + '</span>'
                            } else {
                                return '<span class="text-danger">' + data + '</span>'
                            }
                        } },
                        { field: 'before', title: __('Before'), operate: false },
                        { field: 'after', title: __('After'), operate: false },
                        { field: 'memo', title: __('Memo'), operate: false },
                        // {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate},
                        { field: 'createtime', title: __('Createtime'), operate: 'RANGE', addclass: 'datetimerange', autocomplete: false, formatter: Table.api.formatter.datetime }
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            $("input[name='row[action]']").on('change', function (e) {
                if(e.target.value == 2) {
                    console.log($("#cmb_refnbr"))
                    $("#cmb_refnbr").removeClass('hide')
                } else {
                    $("#cmb_refnbr").addClass('hide')
                }
            });
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
