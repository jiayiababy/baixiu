//向服务器端发送请求 获取文章分类数据
$.ajax({
    url:'/categories',
    type:'get',
    success:function(response){
        console.log(response); 
      var html = template('categoryTpl',{data:response})  
      $('#category').html(html)
    }
})

//当管理员选择文件的时候
$('#feature').on('change',function(){
    //获取到管理员选择到的文件
    var file = this.files[0];
    //创建formData对象 实现二进制文件上传
    var formData = new FormData();
    //将管理员选择到的文件添加到formData对象中
    formData.append('cover',file);
    //实现文章封面图片上传
    $.ajax({
        url:'/upload',
        type:'post',
        data:formData,
        processData:false,
        contentType:false,
        success:function(response){
            console.log(response);
            $('#thumbnail').val(response[0].cover)
        }
    })
})

//当添加文章表单提交的时候
$('#addForm').on('submit',function(){
    //获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    $.ajax({
        url:'/posts',
        type:'post',
        data:formData,
        success:function(){
            location.href = '/admin/posts.html'
        }
    })
    return false;
})

//获取浏览区地址栏中的id参数
var id = getUrlParams('id');
//当前管理员在做修改操作
if(id != -1){
   //根据id获取文章的详细信息
   $.ajax({
       type:'get',
       url:'/posts/' + id,
       success:function(response){
        $.ajax({
            url:'/categories',
            type:'get',
            success:function(categories){
                response.categories = categories;
                console.log(response);
                var html = template('modifyTpl',response);
                $('#parentBox').html(html)
            }
        })
               
       }
   }) 
}

//从浏览器的地址栏中获取查询参数
function getUrlParams(name){
   var paramsAry = location.search.substr(1).split('&');
   //循环数据
   for (var i = 0;i<paramsAry.length;i++){
       var tmp = paramsAry[i].split('=')
       if(tmp[0]==name){
           return tmp[1]
       }
   }
   return -1;
    
}
//当修改文章信息表单发生提交行为的时候
$('#parentBox').on('submit','#modifyForm',function(){
    //获取管理员在表单中输入的内容
    var formData = $(this).serialize()
    //获取管理员正在修改的文章id
    var id = $(this).attr('data-id')
    $.ajax({
        url:'/posts/'+id,
        type:'put',
        data:formData,
        success:function(){
            location.href = '/admin/posts.html';
        }
    })
    //阻止表单默认提交行为
    return false;
})