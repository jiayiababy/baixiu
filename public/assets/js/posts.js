$.ajax({
    type:'get',
    url:'/posts',
    success:function(response){

      var html = template('postsTpl', {data:response.records});

      $('#postsBox').html(html)
      var page = template('pageTpl',response)
      $('#page').html(page)
    }
})
//处理日期时间格式
// function formateDate(date){
//     //将日期时间字符串转换成日期对象
//     date = new Date(date);
//     return   date.getFullYear() + '-'+(date.getMonth()+1) +'-'+ date.getDate()
    
// };
// 分页
function changePage(page){
  $.ajax({
    type:'get',
    url:'/posts',
    data :{
      page:page
    },
    success:function(response){
      console.log(response);
      var html = template('postsTpl', {data:response.records});
      
      console.log(html)
      $('#postsBox').html(html)
      var page = template('pageTpl',response)
      $('#page').html(page)
    }
})
}
//向服务器端发送请求 索要分类数据
$.ajax({
  type:'get',
  url:'/categories',
  success:function(response){
      // console.log(response);
      var html = template('categoryTpl',{data:response});
      $('#categoryBox').html(html)   
  }
})
//当点击筛选的时候
$('#filterForm').on('submit',function(){
  //获取管理选择的过滤条件
  var formData = $(this).serialize();
  //向服务器端发送请求 根据条件索要文件列表数据
  $.ajax({
    type:'get',
    url:'/posts',
    data:formData,
    success:function(response){
      var html = template('postsTpl',response);
      $('#postsBox').html(html);
      var page = template('pageTpl',response);
      $('#page').html(page)
    }
  })
  return false
})
//当删除按钮被点击的时候
$('#postsBox').on('click','.delete',function(){
  //获取管理员要删除的
  if(confirm('您真的要进行删除吗?')){
    //获取管理员要删除的id
    var id = $(this).attr('data-id');
    //向服务器发送请求 
    $.ajax({
      url:'/posts/'+id,
      type:'delete',
      success:function(){
        location.reload()
      }

    })
  }
})
window.onload