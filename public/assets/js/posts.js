$.ajax({
    type:'get',
    url:'/posts',
    success:function(response){
        console.log(response);
      var html = template('postsTpl', response);
    //   console.log(html);
      $('#postsBox').html(html)
      var page = template('pageTpl',response)
      $('#page').html(page)
    }
})
//处理日期时间格式
function formateData(date){
    //将日期时间字符串转换成日期对象
    date = new Date(date);
    return   date.getFullYear() + '-'+(date.getMonth()+1) +'-'+ date.getDate()
    
};
//分页
function changePage(page){
  $.ajax({
    type:'get',
    url:'/posts',
    data :{
      page:page
    },
    success:function(response){
        console.log(response);
      var html = template('postsTpl', response);
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
      console.log(response);
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
