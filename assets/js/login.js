$(function () {
    //点击去注册账号
    $('#link_reg').on('click', function () {
        $('.reg-box').show()
        $('.login-box').hide()

    })
    //点击去登录
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })


    //从layui中获得form对象
    const form = layui.form
    const layer=layui.layer
    //通过form.verify()函数自定义验证规则
    form.verify({
        //自定义了pwd校验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            const pwd = $('.reg-box [name=password]').val()
            if (value !== pwd) {
                return `两次密码不一致`
            }
        }
    })
    //监听注册表单事件
    $('#form_reg').on('submit',function(e){
        //阻止表单默认提交
        e.preventDefault()
        //获取注册表单的值
        const data=$(this).serialize()
        //发起post请求
        $.post('/api/reguser',data,res=>{
            if(res.status!==0) return layer.msg(res.message) 
            layer.msg(res.message)
            //注册成功跳转到登录页面
            $('#link_login').click()
        })
    })


    //监听登录表单事件
    $('#form_login').on('submit',function(e){
        //阻止表单默认提交
        e.preventDefault()
        //获取登录表单的值
        const data=$(this).serialize()
        //发起post请求
        $.post('/api/login',data,res=>{
            if(res.status!==0) return layer.msg(res.message) 
            layer.msg(res.message)
            //将登陆成功后得到的token字符串保存到本地存储
            localStorage.setItem('token',res.token)
            //登录成功跳转到后台主页
            location.href='/index.html'
            
        })
    })

})

