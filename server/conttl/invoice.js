define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'invoice/index' + location.search,
                    add_url: 'invoice/add',
                    edit_url: 'invoice/edit',
                    del_url: 'invoice/del',
                    multi_url: 'invoice/multi',
                    import_url: 'invoice/import',
                    table: 'invoice',
                }

            }, {
                custom: { '2': 'success', '20': 'primary', '22': 'danger', '21': 'info' }
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
                        { field: 'distributor.title', title: __('Distributor.title'), operate: 'LIKE' },
                        { field: 'company.title', title: __('Company.title'), operate: 'LIKE' },
                        { field: 'company_pay_order_id', title: __('Company_pay_order_id') },
                        { field: 'buyer_name', title: __('Buyer_name'), operate: 'LIKE' },
                        { field: 'buyer_tax_num', title: __('Buyer_tax_num'), operate: 'LIKE' },
                        { field: 'saler_name', title: __('Saler_name'), operate: 'LIKE' },
                        { field: 'saler_tax_num', title: __('Saler_tax_num'), operate: 'LIKE' },
                        // { field: 'saler_address', title: __('Saler_address'), operate: 'LIKE' },
                        // {field: 'order_no', title: __('Order_no'), operate: 'LIKE'},
                        { field: 'tax', title: __('Tax'), operate: 'BETWEEN' },
                        { field: 'tax_rate', title: __('Tax_rate'), operate: 'BETWEEN' },
                        { field: 'tax_excluded_amount', title: __('Tax_excluded_amount'), operate: 'BETWEEN' },
                        { field: 'tax_included_amount', title: __('Tax_included_amount'), operate: 'BETWEEN' },
                        { field: 'invoice_serial_num', title: __('Invoice_serial_num'), operate: 'LIKE' },
                        { field: 'status', title: __('Status'), searchList: { '22': __('Status 22'), '2': __('Status 2'), '20': __('Status 20'), '21': __('Status 21'), '24': __('Status 24'), '3': __('Status 3'), '31': __('Status 31') }, formatter: Table.api.formatter.status },
                        { field: 'pdfurl', title: __('Pdfurl'), formatter: Table.api.formatter.file, operate: false },
                        { field: 'reason', title: __('Reason'), operate: false },
                        { field: 'createtime', title: __('Createtime'), operate: 'RANGE', addclass: 'datetimerange', autocomplete: false },
                        {
                            field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate,
                            buttons: [
                                {
                                    name: 'sync',
                                    text: '更新发票状态',
                                    title: '更新发票状态',
                                    classname: 'btn btn-xs btn-success btn-magic btn-ajax',
                                    icon: 'fa fa-magic',
                                    url: 'invoice/sync',
                                    visible: function (row) {
                                        if (row.status == 20 || row.status == 21 || row.status == 31) {
                                            return true;
                                        }
                                    },
                                    confirm: '即将向税务系统获取开票状态，是否继续？',
                                    success: function (data, ret) {
                                        table.bootstrapTable('refresh');
                                    },
                                    error: function (data, ret) {
                                        console.log(data, ret);
                                        Layer.alert(ret.msg);
                                        return false;
                                    }
                                }
                            ]
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
