// jquery.main.js

$(function() {
    // valores de campo originais
    var field_values = {
        'username'  : 'username',
        'password'  : 'password',
        'cpassword' : 'password',
        'firstname' : 'first name',
        'lastname'  : 'last name',
        'email'     : 'email address'
    };

    // inputfocus
    $('input#username').inputfocus({ value: field_values['username'] });
    $('input#password').inputfocus({ value: field_values['password'] });
    $('input#cpassword').inputfocus({ value: field_values['cpassword'] }); 
    $('input#lastname').inputfocus({ value: field_values['lastname'] });
    $('input#firstname').inputfocus({ value: field_values['firstname'] });
    $('input#email').inputfocus({ value: field_values['email'] });

    // redefinir barra de progresso
    $('#progress').css('width','0');
    $('#progress_text').html('0% Completo');

    // primeiro passo
    $('form').submit(function(){ return false; });
    $('#submit_first').click(function(){
        $('#first_step input').removeClass('error').removeClass('valid');

        var fields = $('#first_step input[type=text], #first_step input[type=password]');
        var error = 0;
        fields.each(function(){
            var value = $(this).val();
            if( value.length < 4 || value == field_values[$(this).attr('id')] ) {
                $(this).addClass('error');
                $(this).effect("shake", { times:3 }, 50);
                error++;
            } else {
                $(this).addClass('valid');
            }
        });

        if(!error) {
            if( $('#password').val() != $('#cpassword').val() ) {
                $('#first_step input[type=password]').each(function(){
                    $(this).removeClass('valid').addClass('error');
                    $(this).effect("shake", { times:3 }, 50);
                });
                return false;
            } else {
                $('#progress_text').html('33% Completo');
                $('#progress').css('width','113px');
                $('#first_step').slideUp();
                $('#second_step').slideDown();
            }
        } else return false;
    });

    $('#submit_second').click(function(){
        $('#second_step input').removeClass('error').removeClass('valid');

        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;  
        var fields = $('#second_step input[type=text]');
        var error = 0;
        fields.each(function(){
            var value = $(this).val();
            if( value.length < 1 || value == field_values[$(this).attr('id')] || 
                ( $(this).attr('id') == 'email' && !emailPattern.test(value) ) ) {
                $(this).addClass('error');
                $(this).effect("shake", { times:3 }, 50);
                error++;
            } else {
                $(this).addClass('valid');
            }
        });

        if(!error) {
            $('#progress_text').html('66% Completo');
            $('#progress').css('width','226px');
            $('#second_step').slideUp();
            $('#third_step').slideDown();
        } else return false;
    });

    $('#submit_third').click(function(){
        $('#progress_text').html('100% Completo');
        $('#progress').css('width','339px');

        var fields = [
            $('#username').val(),
            $('#password').val(),
            $('#email').val(),
            $('#firstname').val() + ' ' + $('#lastname').val(),
            $('#age').val(),
            $('#gender').val(),
            $('#country').val()                       
        ];

        var tr = $('#fourth_step tr');
        tr.each(function(){
            $(this).children('td:nth-child(2)').html(fields[$(this).index()]);
        });

        $('#third_step').slideUp();
        $('#fourth_step').slideDown();
    });

    $('#submit_fourth').click(function() {
        var userData = {
            username: $('#username').val(),
            password: $('#password').val(),
            email: $('#email').val(),
            firstname: $('#firstname').val(),
            lastname: $('#lastname').val(),
            age: $('#age').val(),
            gender: $('#gender').val(),
            country: $('#country').val()
        };
    
        // Salva `userData` no Local Storage
        localStorage.setItem(userData.email, JSON.stringify(userData));
        alert('Cadastro realizado com sucesso!');
        window.location.href = "login.html"; // Redireciona para a página de login
    });

    // Função Esqueci minha senha
    $('#forgot-password').click(function(e) {
        e.preventDefault();
        $('#password-recovery-modal').show();
    });

    $('#recover-password').click(function() {
        const recoveryEmail = $('#recovery-email').val();
        const userData = JSON.parse(localStorage.getItem(recoveryEmail));

        if (userData && userData.password) {
            $('#recovery-message').text(`Sua senha é: ${userData.password}`);
        } else {
            $('#recovery-message').text("E-mail não encontrado. Verifique e tente novamente.");
        }
    });
});
