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