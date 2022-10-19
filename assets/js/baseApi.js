//每次调用ajax请求会先调用这个函数
//在这个函数内我们可以拿到给ajax提供的配置对象
$.ajaxPrefilter(options=>{
    // console.log(options.url);
    // console.log(options.type);
    options.url='http://www.liulongbin.top:3007'+options.url
})