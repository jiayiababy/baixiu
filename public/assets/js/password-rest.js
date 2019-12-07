//修改密码
$('#modifyForm').on('submit',function(){
    //获取用户在表单中输入内容
    var formData = $(this).serialize();
    //接口
    $.ajax({
        url:'/users/password',
        type:'put',
        data:formData,
        success:function(){
            location.href = '/admin/login.html'
        },
        error:function(){
            console.log();
            
        }
        
    })
    //阻止默认提交行为
    return false;

})