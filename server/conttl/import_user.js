define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'import_user/index' + location.search,
                    add_url: 'import_user/add',
                    edit_url: 'import_user/edit',
                    del_url: 'import_user/del',
                    multi_url: 'import_user/multi',
                    import_url: 'import_user/import',
                    table: 'import_user',
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
                pageSize: 50,
                columns: [
                    [
                        { checkbox: true },
                        { field: 'idnum', title: __('Idnum'), operate: 'LIKE' },
                        { field: 'nickname', title: __('Nickname'), operate: 'LIKE' },
                        { field: 'mobile', title: __('Mobile'), operate: 'LIKE' },
                        // { field: 'address', title: __('Address'), operate: 'LIKE' },
                        { field: 'bank_name', title: __('Bank_name'), operate: 'LIKE' },
                        { field: 'bank_city', title: __('Bank_city'), operate: 'LIKE' },
                        { field: 'bank_cardno', title: __('Bank_cardno'), operate: 'LIKE' },
                        { field: 'createtime', title: __('Createtime'), operate: 'RANGE', addclass: 'datetimerange', autocomplete: false },
                        { field: 'updatetime', title: __('Updatetime'), operate: 'RANGE', addclass: 'datetimerange', autocomplete: false },
                        { field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate }
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);

            // 确认提交按钮
            $(document).on("click", ".btn-confirm", function () {
                var ids = Table.api.selectedids(table);
                if (ids.length === 0) {
                    layer.alert('请先选择要签约的灵活用工人员');
                    return false;
                }
                layer.confirm('处理成功的数据将被删除，处理失败的数据将会保留。请检查下方信息确认无误。', { icon: 3, title: '确认发送签约邀请' }, function (index) {
                    layer.close(index)
                    Fast.api.ajax({
                        url: 'import_user/confirm',
                        data: {ids: Table.api.selectedids(table)}
                    }, function (data, ret) {
                        table.bootstrapTable('refresh');
                    }, function (data, ret) {
                        table.bootstrapTable('refresh');
                    });
                });
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
