$(function () {
    const form = layui.form
    const layer = layui.layer

    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间'
            }
        }
    })

    initUserInfo()
    //初始化用户信息
    function initUserInfo() {
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                //快速为表单赋值 form.val()
                form.val('formUserInfo', res.data)

            }
        });
    }

    //重置表单的数据
    $('#btnReset').on('click', function (e) {
        //阻止表单默认重置
        e.preventDefault()
        initUserInfo()
    })

    //更新用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                //调用父页面中的方法,重新渲染用户的头像和信息
                window.parent.getUserInfo()
            }
        });
    })

})