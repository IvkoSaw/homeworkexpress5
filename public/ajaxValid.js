$(function(){
    //these all for ajax
    // if these all true, ajax will be send
    var isName = false;
    var isEmail = false;
    var isPass = false;
    var isRepass = false;

    $('button').on('click', function(event){
        event.preventDefault();

        var name = $('#name').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var rePassword = $('#rePassword').val();

        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        //remove all bootstrap classes that let know us about errors
        $('.divName').removeClass('has-error');
        $('label[for="name"]').removeClass("control-label");
        $('.divEmail').removeClass('has-error');
        $('label[for="email"]').removeClass("control-label");
        $('.divPass').removeClass('has-error');
        $('label[for="password"]').removeClass("control-label");
        $('.divRepass').removeClass('has-error');
        $('label[for="rePassword"]').removeClass("control-label");
        $('.registered').remove();

        //client validation
        if (name.length <= 1) {
            $('.divName').addClass('has-error');
            $('label[for="name"]').addClass("control-label");
            isName = false;
        }else{
            isName = true;
        }
        if (!validateEmail(email)) {
            $('.divEmail').addClass('has-error');
            $('label[for="email"]').addClass("control-label");
            isEmail = false;
        }else{
            isEmail = true;
        }
        if (password.length < 6) {
            $('.divPass').addClass('has-error');
            $('label[for="password"]').addClass("control-label");
            isPass = false;
        }else{
            isPass = true;
        }
        if (password != rePassword || rePassword == "" || isPass == false) {
            $('.divRepass').addClass('has-error');
            $('label[for="rePassword"]').addClass("control-label");
            isRepass = false;
        }else{
            isRepass = true
        }

        if (isName && isEmail && isPass && isRepass) {//if this true, ajax will be send
            $.ajax({
                url:"http://localhost:3000/signUp",
                method:"post",
                data:{
                    name:name,
                    email:email,
                    password:password,
                    rePassword:rePassword
                },
                success:function(res){
                    var response = $('<div class="registered bg-success h3">You were registered!</div>');
                    $('form').append(response);
                },
                error:function(res){
                    var response = $('<div class="registered bg-danger h3">There was a mistake, try again please!</div>');
                    $('form').append(response);
                }
            });
        }


    });

});