$(document).ready(function () {
    //Global variables
    var valid = false;

    //Validation checker
    //Checks that the email address entered into the form is valid, if not it displays an error message
    function validateEmail(email) {
        
        //Initiates error fade upon user beginning to type in the text field
        $('#Email').click(function () {
            $(this).next('#ErrMessage').slideUp("fast");
        });

        var re = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (email == null || email < 1) {
            $('#ErrMessage').text('An email is required.');
        }
        else if (!re.test(email)) {
            $('#ErrMessage').text('Please enter a valid email.');
        }
        else {
            $('#ErrMessage').hide();
            valid = true;
        }
    }
    // jQuery event handler:
    // 1. Listens for the "Subscribe" button to be clicked
    // 2. Retrieves the information entered into the Subscription form
    // 3. Passes the data to the FormController to be entered into a database
    $('#SubscribeButton').on('click', function (event) {
        //Prevent default action
        event.preventDefault();

        //Retrieve data from HTML form
        var formData = {};
        formData.email = $("#Email").val();
        validateEmail(formData.email);
        formData.firstName = $("#FirstName").val();
        formData.lastName = $("#LastName").val();
        formData = JSON.stringify(formData);

        if (valid) {
            //Pass data to the controller
            $.ajax({
                type: 'POST',
                url: '/Form/AddToDatabase',
                contentType: 'application/json',
                data: formData,
                success: function (data) {
                    window.location = '/Form/Complete';
                },
                error: function (result) {
                    console.log(result);
                }
            });
        }
    });
});