$(function () {
    const layer = layui.layer
    getUserInfo()
    //点击按钮实现退出功能
    $('#btnLogout').on('click', function () {
        //提示用户是否确认退出登录
        layer.confirm('确定退出登录么?', { icon: 3, title: '提示' },
            function (index) {
                // console.log('ok');
                //清空本地存储里面的token
                localStorage.removeItem('token')
                //跳转到登录页面
                location.href = '/login.html'
                layer.close(index);
            });
    })
})
//获取用户基本信息
function getUserInfo() {
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        //headers请求头配置对象
        // headers:{Authorization:localStorage.getItem('token')||''},
        success(res) {
            if (res.status !== 0) return layer.msg('获取用户信息失败')
            // console.log(res);
            renderAvatar(res.data)
        },
        //无论成功还是失败都会调用这个函数
        //在complete函数中,可以使用res.responseJSON 拿到服务器响应回来的数据
        // complete(res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         //强制清空token
        //         localStorage.removeItem('token')
        //         //跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
    });
}

//渲染用户的头像
function renderAvatar(user) {
    //获取用户名称
    const name = user.nickname || user.username
    //设置欢迎的文本
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)
    //判断用户上传头像了没有 上传了就渲染
    if (user.user_pic !== null) {
        $('.layui-nav-img').prop('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //没上传 就让文本显示用户名的第一个的大写字母
        $('.layui-nav-img').hide()
        const first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}