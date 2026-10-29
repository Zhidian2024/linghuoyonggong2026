define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'company_pay_order/index' + location.search,
                    add_url: 'company_pay_order/add',
                    edit_url: 'company_pay_order/edit',
                    del_url: 'company_pay_order/del',
                    multi_url: 'company_pay_order/multi',
                    import_url: 'company_pay_order/import',
                    table: 'company_pay_order',
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
                        { field: 'id', title: __('Id') },
                        { field: 'distributor.title', title: __('Distributor.title'), operate: false },
                        { field: 'distributor.cmb_accnbr', title: __('Distributor.cmb_accnbr'), operate: false },
                        { field: 'company.title', title: __('Company.title'), operate: 'LIKE' },
                        { field: 'job.title', title: __('Job.title'), operate: 'LIKE' },
                        { field: 'job.category_name', title: __('Job.Category'), operate: false },
                        { field: 'total_amount', title: __('Total_amount'), operate: 'BETWEEN' },
                        { field: 'suc_money', title: __('Suc_money'), operate: 'BETWEEN' },
                        {
                            field: 'total_num', title: __('Total_num'), operate: false, formatter: function (value, row, index) {
                                var url = Table.api.replaceurl(table.bootstrapTable('getOptions').extend.edit_url, row, table);
                                return value + ' <a href="' + url + '" class="btn-dialog" title="支付清单">(详情)</a>';
                            }
                        },
                        {
                            field: 'err_num', title: __('Err_num'), operate: false, formatter: function (value, row, index) {
                                if (row.suc_num !== null) {
                                    let err_num = row.total_num - row.suc_num;
                                    if (err_num > 0) {
                                        return '<span class="text-danger">' + err_num + '</span>';
                                    }
                                    return err_num;
                                }
                            }
                        },
                        { field: 'fee_percent', title: __('Fee_percent'), operate: false },
                        { field: 'final_amount', title: __('Final_amount'), operate: false },
                        { field: 'status', title: __('Status'), searchList: { "WAIT": __('Status wait'), "FIN": __('Status fin'), "OPR": __('Status opr'), "AU": __('Status au'), "NTE": __('Status nte'), "APW": __('Status apw'), "WRF": __('Status wrf'), "BNK": __('Status bnk') }, formatter: Table.api.formatter.status },
                        { field: 'result', title: __('Result'), searchList: { "C": __('Result c'), "S": __('Result s'), "F": __('Result f'), "D": __('Result d'), "R": __('Result r') }, formatter: Table.api.formatter.status },
                        { field: 'invoice.status', title: __('Invoice.status'), searchList: { null: '未开票', '22': __('Invoice.status 22'), '2': __('Invoice.status 2'), '20': __('Invoice.status 20'), '21': __('Invoice.status 21'), '24': __('Invoice.status 24'), '3': __('Invoice.status 3'), '31': __('Invoice.status 31') }, formatter: Table.api.formatter.status },
                        { field: 'invoice.pdfurl', title: __('Invoice.Pdfurl'), formatter: Table.api.formatter.file, operate: false },
                        { field: 'createtime', title: __('Createtime'), operate: 'RANGE', addclass: 'datetimerange', autocomplete: false },
                        {
                            field: 'operate', title: __('Operate'), visible: !Config.isAgent, table: table, events: Table.api.events.operate,
                            buttons: [
                                {
                                    name: 'pay',
                                    text: '发起支付',
                                    title: '发起支付',
                                    classname: 'btn btn-xs btn-success btn-magic btn-ajax',
                                    icon: 'fa fa-magic',
                                    url: 'company_pay_order/pay',
                                    visible: function (row) {
                                        if (row.status == 'WAIT') {
                                            return true;
                                        }
                                    },
                                    confirm: '发起支付后，将无法撤回或修改，请确保发放信息无误。是否继续？',
                                    success: function (data, ret) {
                                        table.bootstrapTable('refresh');
                                    },
                                    error: function (data, ret) {
                                        console.log(data, ret);
                                        Layer.alert(ret.msg);
                                        return false;
                                    }
                                },
                                {
                                    name: 'sync_order',
                                    text: '同步银行数据',
                                    title: '同步银行数据',
                                    classname: 'btn btn-xs btn-success btn-magic btn-ajax',
                                    icon: 'fa fa-magic',
                                    url: 'company_pay_order/sync_order',
                                    visible: function (row) {
                                        if (row.status != 'WAIT') {
                                            return true;
                                        }
                                    },
                                    confirm: '即将同步银行数据，只有在银行未完成打款的状态，或数据有异常的情况下建议使用。请勿连续多次使用此功能，确认继续？',
                                    success: function (data, ret) {
                                        table.bootstrapTable('refresh');
                                    },
                                    error: function (data, ret) {
                                        console.log(data, ret);
                                        Layer.alert(ret.msg);
                                        return false;
                                    }
                                },
                                {
                                    name: 'invoice',
                                    text: '开具发票',
                                    title: '开具发票',
                                    classname: 'btn btn-xs btn-primary btn-dialog',
                                    icon: 'fa fa-wpforms',
                                    visible: function (row) {
                                        if (!row.invoice.id) {
                                            return true;
                                        }
                                    },
                                    url: 'invoice/add/order_id/{ids}'
                                    , success: function (data, ret) {
                                        table.bootstrapTable('refresh');
                                    },
                                    error: function (data, ret) {
                                        console.log(data, ret);
                                        Layer.alert(ret.msg);
                                        return false;
                                    }
                                },
                                {
                                    name: 'sync',
                                    text: '更新发票状态',
                                    title: '更新发票状态',
                                    classname: 'btn btn-xs btn-info btn-ajax',
                                    icon: 'fa fa-wpforms',
                                    url: function (row) {
                                        if (row.invoice.id) {
                                            return 'invoice/sync/ids/' + row.invoice.id;
                                        } else {
                                            return '';
                                        }
                                    },
                                    visible: function (row) {
                                        if (row.invoice.id && (row.invoice.status == 20 || row.invoice.status == 21 || row.invoice.status == 31)) {
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
                            ], formatter: Table.api.formatter.operate
                        }
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            Controller.api.bindevent();

            // 确认提交按钮
            $(document).on("click", ".btn-fetch", function () {
                var job_id = $("#c-job_id").val();
                if (!job_id) {
                    layer.msg('请先选择工作岗位');
                    return false;
                }
                $.get({
                    url: 'user_job/index',
                    data: { op: '{"job_id":"="}', filter: '{"job_id":"' + job_id + '"}' },
                }, function (data) {
                    let jsondata = [];
                    if (data.total) {
                        // 遍历返回结果，并将idnum和nickname字段的值赋值给jsondata
                        $.each(data.rows, function (index, item) {
                            jsondata.push({ idnum: item.idnum, nickname: item.user.nickname, amount: ""});
                        });
                    }
                    $("#detailtext").val(JSON.stringify(jsondata))
                    var fieldlist = $(".fieldlist", $("form[role=form]"));
                    fieldlist.trigger("fa.event.refreshfieldlist");
                });
            });
        },
        edit: function () {
            Controller.api.bindevent();
        },
        invoice: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
                require(['upload'], function (Upload) {
                    Upload.api.upload($("#btn-import-file"), function (data, ret) {
                        Fast.api.ajax({
                            url: 'company_pay_order/import',
                            data: { file: data.url },
                        }, function (data, ret) {
                            if (ret.code == 1) {
                                $("#detailtext").val(JSON.stringify(ret.data))
                                var fieldlist = $(".fieldlist", $("form[role=form]"));
                                fieldlist.trigger("fa.event.refreshfieldlist");
                            }
                        });
                    });
                });
            }
        }
    };
    return Controller;
});
