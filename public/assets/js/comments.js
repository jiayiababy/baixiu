$.ajax({
  url: "/comments",
  type: "get",
  success: function(response) {
    console.log(response);
    var html = template("commentsTpl", response);
    $("#commentsBox").html(html);
    var pageHTML = template("pageTpl", response);
    $("#pageBox").html(pageHTML);
  }
});
//实现分页
function changePage(page) {
  $.ajax({
    url: "/comments",
    type: "get",
    data: {
      page: page
    },
    success: function(response) {
      console.log(response);
      var html = template("commentsTpl", response);
      $("#commentsBox").html(html);
      var pageHTML = template("pageTpl", response);
      $("#pageBox").html(pageHTML);
    }
  });
}
//当审核按钮被点击的时候
$("#commentsBox").on("click", ".status", function() {
  //获取当前评论状态
  var status = $(this).attr("data-status");
  //获取当前要修改的id
  var id = $(this).attr("data-id");
  $.ajax({
    type: "put",
    url: "/comments/" + id,
    data: {
      state: status == 0 ? 1 : 0
    },
    success: function() {
      location.reload();
    }
  });
});
$("#commentsBox").on("click", ".delete", function() {
  if (confirm("您真的要执行删除操作吗?")) {
    //获取要删除的ID
    var id = $(this).attr("data-id");
    $.ajax({
        url:'/comments/'+id,
        type:'delete',
        success:function(){
            location.reload()
        }
    })
  }
});
