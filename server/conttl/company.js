define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'company/index' + location.search,
                    add_url: 'company/add',
                    edit_url: 'company/edit',
                    del_url: 'company/del',
                    multi_url: 'company/multi',
                    import_url: 'company/import',
                    table: 'company',
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
                        // {field: 'id', title: __('Id')},
                        { field: 'title', title: __('Title'), operate: 'LIKE' },
                        { field: 'code', title: __('Code'), operate: 'LIKE' },
                        { field: 'distributor.title', title: __('Distributor.title'), operate: 'LIKE' },
                        { field: 'agent.title', title: __('Agent.title'), operate: 'LIKE' },
                        { field: 'charge_percent', title: __('Charge_percent'), operate: false },
                        { field: 'fee_percent', title: __('Fee_percent'), operate: false },
                        { field: 'balance', title: __('balance'), operate: false },
                        { field: 'status', title: __('Status'), searchList: { "0": __('Status 0'), "1": __('Status 1') }, formatter: Table.api.formatter.toggle },
                        { field: 'signed', title: __('Signed'), searchList: { "0": __('Signed 0'), "1": __('Signed 1') }, formatter: Table.api.formatter.status },
                        { field: 'auto_sign', title: __('Auto_sign'), searchList: { "0": __('Auto_sign 0'), "1": __('Auto_sign 1') }, formatter: Table.api.formatter.toggle },
                        { field: 'note', title: __('Note'), operate: false },
                        { field: 'createtime', title: __('Createtime'), operate: 'RANGE', addclass: 'datetimerange', autocomplete: false },
                        {
                            field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate,
                            buttons: [
                                {
                                    name: 'contract',
                                    text: '签约合同文件',
                                    title: '签约合同文件',
                                    classname: 'btn btn-xs btn-primary btn-dialog',
                                    icon: 'fa fa-file',
                                    visible: function (row) {
                                        if (row.status == 1 || row.status == -2) {
                                            return true;
                                        }
                                    },
                                    url: 'company/contract'
                                    , success: function (data, ret) {
                                        table.bootstrapTable('refresh');
                                    },
                                    error: function (data, ret) {
                                        console.log(data, ret);
                                        Layer.alert(ret.msg);
                                        return false;
                                    }
                                }
                            ], formatter: Table.api.formatter.operate
                        }
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        contract: function () {
            Controller.api.bindevent();
        },
        charge: function () {
            $('#need_pay').on('input', function () {
                var need_pay = $(this).val();
                var balance = $('#balance').text();
                var fee_percent = $('#fee_percent').text();
                var need_charge = need_pay * (1 + fee_percent / 100) - balance;
                if (need_charge < 0) {
                    need_charge = 0;
                }
                $('#need_charge').text(need_charge.toFixed(2));
            });
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
