define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'job/index' + location.search,
                    add_url: 'job/add',
                    edit_url: 'job/edit',
                    del_url: 'job/del',
                    multi_url: 'job/multi',
                    import_url: 'job/import',
                    table: 'job',
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
                        { field: 'title', title: __('Title'), operate: 'LIKE' },
                        { field: 'category.name', title: __('Category.name'), operate: false },
                        { field: 'company.title', title: __('Company.title'), operate: 'LIKE' },
                        // { field: 'recruit_number', title: __('Recruit_number') },
                        // { field: 'salary', title: __('Salary') },
                        // {field: 'is_grab', title: __('Is_grab'), searchList: {"1":__('Yes'),"0":__('No')}, formatter: Table.api.formatter.normal},
                        { field: 'open', title: __('Open'), searchList: { "0": __('Open 0'), "1": __('Open 1') }, formatter: Table.api.formatter.toggle },
                        { field: 'createtime', title: __('Createtime'), operate: 'RANGE', addclass: 'datetimerange', autocomplete: false },
                        { field: 'updatetime', title: __('Updatetime'), operate: 'RANGE', addclass: 'datetimerange', autocomplete: false },
                        {
                            field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate, buttons: [
                                {
                                    name: 'detail',
                                    text: '查看岗位人员',
                                    title: '岗位人员',
                                    classname: 'btn btn-xs btn-primary btn-dialog',
                                    icon: 'fa fa-list',
                                    extend: 'data-area=\'["90%","90%"]\'',
                                    url: 'user_job/index?job_id={id}',
                                }]
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
