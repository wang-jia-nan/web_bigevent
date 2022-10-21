$(function () {

    const layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    //未上传按钮绑定点击事件
    $('#btnChooseImg').on('click', function () {
        $('#file').click()
    })
    //为文件选择框绑定change事件
    $('#file').on('change', function (e) {
        //可以拿到用户选择的文件
        const files = e.target.files
        if (files.length === 0) return layer.msg('请选择照片')
        //将文件转化为路径
        const imgUrl = URL.createObjectURL(files[0])
        console.log(files[0]);
        //重新初始化裁剪区
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', imgUrl)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

    })
    //为确定按钮绑定点击事件
    $('#btnUpload').on('click', function () {
        // 拿到用户裁剪的头像
        const dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        //调用接口,渲染头像
        $.ajax({
            type: "post",
            url: "/my/update/avatar",
            data: { avatar: dataURL },
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                window.parent.getUserInfo()
            }
        });
    })
})