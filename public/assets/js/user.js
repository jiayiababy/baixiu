//当表单发生提交的时候
$('#userForm').on('submit',function(){
    // 获取到用户在表单中输入的内容并将内容格式化成参数字符串
    var formData = $(this).serialize();
    // 向服务器端发送添加用户的请求
    $.ajax({
        type:'post',
        url: '/users',
        data: formData,
        success:function(){
            //刷新页面
            location.reload();
        },
        error:function(){
            alert('用户添加失败')
        }
    })
    // 阻止表单的默认提交行为
	return false;
})
//上传头像
$('#modifyBox').on('change','#avatar',function(){
    var formData = new FormData();
    formData.append('avatar',this.files[0]);
    $.ajax({
        url:'/upload',
        type:'post',
        data:formData,
        //告诉$.ajax方法不要解析请求参数
        processData:false,
        //告诉$.ajax方法不要设置请求参数的类型
        contentType:false,
        success:function(response){
              console.log(response);
              //实现头像预览功能
              $('#preview').attr('src',response[0].avatar);
              $('#hiddenAvater').val(response[0].avatar)
        }
    })
})
//向服务器端发送请求 索要用户列表数据
$.ajax({
    type:'get',
    url:'/users',
    success:function(response){
        console.log(response);
       var html = template('userTpl',{data:response});
       $('#userBox').html(html)
    }
})
//通过事件委托的方式编辑按钮添加点击事件
$('#userBox').on('click','.edit',function(){
    //获取被点击用户的id值
    var id = $(this).attr('data-id');
    //根据id获取用户的详细信息
    $.ajax({
        url:'/users/'+id,
        success:function(response){
            console.log(response);
            var html = template('modifyTpl',response);
            $('#modifyBox').html(html)           
        }
    })
});
//为修改表单添加表单提交事件
$('#modifyBox').on('submit','#modifyForm',function(){
    //获取用户在表单中输入的内容
    var formData = $(this).serialize();
    // console.log(formData);
    //获取要修改的那个用户的id值
    var id = $(this).attr('data-id');
    //发送请求修改用户信息
    $.ajax({
        url:'/users/' + id,
        type:'put',
        data:formData,
        success:function(response){
            // console.log(response);
            //修改成功 重新加载页面
            location.reload()          
        }
    })
    //阻止表单默认提交
    return false;
});
//当删除按钮被点击的时候
$('#userBox').on('click','.delete',function(){
    if(confirm('你真的要删除用户吗?')) {
        var id = $(this).attr('data-id');
        $.ajax({
            url:'/users/' + id,
            type:'delete',
            success:function(){
                location.reload()
            }
        })
    }
});
//获取全选按钮
var selectAll = $('#selectAll')
//获取批量删除按钮
var deleteMany = $('#deleteMany')
//全选按钮改变时
$('#selectAll').on('change',function(){
    //获取全选当前的状态
    var status = $(this).prop('checked')
    if(status){
        //批量删除显示
        $('#deleteMany').show()
    }else{
        //批量删除隐藏
        $('#deleteMany').hide()
    }
    //获取到所以的用户
    $('#userBox').find('input').prop('checked',status);
});
//当用户前面的复选框状态发生改变时
$('#userBox').on('change','.userStatus',function(){
    var inputs = $('#userBox').find('input');
    if(inputs.length==inputs.filter(':checked').length) {
        //所有用户都是选中的
        selectAll.prop('checked',true);
    }else{
        //不是所有的用户都是选中的
        selectAll.prop('checked',false);
    }
    //如果复选框被选中的数量大于0,就显示复选框
    if(inputs.filter(':checked').length>0){
        $('#deleteMany').show()
    }else{
        $('#deleteMany').hide()
    }
})
//为批量删除按钮添加点击事件
deleteMany.on('click',function(){
    var ids = [];
    //获取选中的用户
    var checkedUser =  $('#userBox').find('input').filter(':checked')
    //循环复选框 从复选框元素身上获取data-id的属性值
    checkedUser.each(function(index,element){
        ids.push($(element).attr('data-id'));
    });
    
   if(confirm('您真的确定要批量删除操作吗')){
       $.ajax({
           type:'delete',
           url:'/users/' + ids.join('-'),
           success:function(){
               location.reload()
           }
       })
   }
    
});