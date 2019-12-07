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
    //   console.log(html);
      $('#postsBox').html(html)
      var page = template('pageTpl',response)
      $('#page').html(page)
    }
})
}