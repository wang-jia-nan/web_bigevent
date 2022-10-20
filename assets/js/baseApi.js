//每次调用ajax请求会先调用这个函数
//在这个函数内我们可以拿到给ajax提供的配置对象
$.ajaxPrefilter(options => {
    // console.log(options.url);
    // console.log(options.type);
    options.url = 'http://www.liulongbin.top:3007' + options.url

    //统一为有权限的接口,设置headers请求头
    if (options.url.includes('/my/')) {
        // if(options.url.indexOf('/my/')!==-1){
        options.headers = { Authorization: localStorage.getItem('token') || '' }
    }
    //统一全局挂载complete 回调函数
    options.complete = res => {
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            //强制清空token
            localStorage.removeItem('token')
            //跳转到登录页面
            location.href = '/login.html'
        }
    }
})