$pos = jQuery.noConflict()

$pos(document).on( 'ready', function () {

    // After Form Submitted Validation
    $pos("input[name='log']").val('Webkul1');
    $pos("input[name='pwd']").val('admin');
    $pos("#posloginform").on("submit", function (event) {

        var errorLog = false;
        var errorPass = false;


        if (element_log == '') {

            errorLog = false;

        } else {

            errorLog = true;

        }

        if (element_pass == '') {

            errorPass = false;

        } else {

            errorPass = true;

        }

        if (errorLog && errorPass) {
            indexedDB.deleteDatabase('pos')
            if ($pos('#rememberme').is(':checked')) {
                // save username and password
                localStorage.usrname = $pos("input[name='log']").val();
                localStorage.pass = $pos("input[name='pwd']").val();
                localStorage.chkbx = $pos('#rememberme').val();
            } else {
                localStorage.usrname = '';
                localStorage.pass = '';
                localStorage.chkbx = '';
            }
            if (localStorage.cashdrawer && localStorage.cashdrawer != '') {
                localStorage.removeItem('cashdrawer');
            }
            $pos("#posloginform")[0].submit();
        } else {

            event.preventDefault();
            $pos('.wkwcpos-login-error').show();
        }


    });


    
    if (localStorage.chkbx && localStorage.chkbx != '') {
        $pos('#rememberme').attr('checked', 'checked');
        $pos("input[name='log']").val(localStorage.usrname);
        $pos("input[name='pwd']").val(localStorage.pass);
    } else {
        $pos('#rememberme').removeAttr('checked');
        $pos("input[name='log']").val('');
        $pos("input[name='pwd']").val('');
    }

    $pos('#rememberme').click(function () {

    });

});
