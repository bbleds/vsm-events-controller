$(document).ready(function(){
  var errorMsgHolder = $('#error-msg');
  errorMsgHolder.hide();

  // prevent default form submit action
  $('#sign_up_form').on('submit', function(e){
    e.preventDefault();

    var processingText = 'Processing...';
    var submitText = 'Submit';
    var valid = true;
    var requiredFields = {
      'first-name' : 'First Name',
      'last-name': 'Last Name',
    };
    var errorMsgs = [];
    var submitBtn = $('#sign_up_submit');

    // change html to inform user that form is processing
    submitBtn.val(processingText);

    // validate required fields
    for(field in requiredFields){
      var input = $("#"+field);
      var value = input.val();
      if(!value){
       valid = false;
       errorMsgs.push(requiredFields[field]+" is required.");
      }
    }

    // if invalid submission, inform user
    if(!valid){
      submitBtn.val(submitText);
      errorMsgOutput = '';
      errorMsgHolder.show();
      errorMsgs.map(function(item,index){
        errorMsgOutput+= "<p>"+item+"</p>";
      });

      errorMsgHolder.html("<div><p>We encountered an error while processing your submission:</p>"+errorMsgOutput+"</div>");
    } else {
      //  hide our error msg
      errorMsgHolder.hide();

      var eventsUrl = 'http://visionstudentministries.org/api/';
      var api_key = '';
      var requestUrl = eventsUrl;
      var postData = $(this).serialize();
      var queryString = 'action=add-user-to-event&apikey='+api_key+'&'+postData;

      $.ajax({
        type: "POST",
        url: eventsUrl,
        data: queryString,
        success: function(){
          console.log('got stuff back');
        }
      });
    }

  })
})
