//当添加分类表单发生提交行为
$('#addCategory').on('submit',function(){
    //获取用户在表单中输入的内容
    var formData = $(this).serialize();
    //向服务器端发送请求
    $.ajax({
        url:'/categories',
        type:'post',
        data:formData,
        success:function(){
            location.reload();
        }
    })
    return false;
});
//发送ajax请求 向服务器端所以分类列表数据
$.ajax({
    type:'get',
    url:"/categories",
    success:function(response) {
    //将服务器端返回的数据和HTML模板进行拼接
    var html = template('categoryListTpl',{data:response});
    $('#categoryBox').html(html);
    }
});
//为编辑按钮添加点击事件
$('#categoryBox').on('click','.edit',function(){
    //获取ID
    var id=$(this).attr('data-id')
    $.ajax({
        url:'/categories/'+id,
        type:'get',
        success:function(response){
            console.log(response);
           var html = template('modifyCategoryTpl',response);         
           $('#formBox').html(html)
        }
    }) 
});
$('#formBox').on('submit','#modifyCategory',function(){
    //获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    //获取要修改的分类ID
    var id = $(this).attr('data-id');
    $.ajax({
        type:'put',
        url:'/categories/'+id,
        data:formData,
        success:function(){
            location.reload()
        }
    })
    return false

})
//点击删除进行操作
$('#categoryBox').on('click','.delete',function(){
    if(confirm('您真的要确定删除吗')){
    var id = $(this).attr('data-id');
    $.ajax({
        type:'delete',
        url:'/categories/'+id,
        success:function(){
            location.reload();
        }
    })
}
})

