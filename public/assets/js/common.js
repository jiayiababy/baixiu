$('#loginBtn').on('click', function () {
    var email = $('#email').val();
    var password = $('#password').val();
    if (email.trim().length == 0) {
      alert('请输入邮箱')
      return;
    }
    if (password.trim().length == 0) {
      alert('请输入面密码')
      return;
    }
    $.ajax({
      url: '/login',
      type: 'post',
      data: {
        email: email,
        password: password
      },
      success: function (data) {
        location.href = '/admin/'
      },
      error: function () {
        alert('用户名或者密码错误')
      }
    })
  });
  //处理日期时间格式
function formateDate(date){
  //将日期时间字符串转换成日期对象
  date = new Date(date);
  return   date.getFullYear() + '-'+(date.getMonth()+1) +'-'+ date.getDate();
};
// 向服务器发送请求 索要登录用户信息
$.ajax({
  type: 'get',
  url: '/users/' + userId,
  success: function (response) {
    console.log(response);
    $('.avatar').attr('src',response.avatar)
    $('.profile .name').html(response.nickName)
  } 
})