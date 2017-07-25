<?php
require_once('./class.EventsFeed.php');

// methods for getting and listing events
$config = require_once('../config.php');

$events = new EventsFeed($config);

?>

<!DOCTYPE html>
<html>
<head>
    <link href="../css/normalize.css" type="text/css" rel="stylesheet">
    <link href="../css/main.css" type="text/css" rel="stylesheet">
    <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
    <meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <div id="content_wrap">
    <div id="toggled_nav">
      <ul>
        <a href="../index.php"><li class="major_header_text">Home</li></a>
          <a href="about.html"><li class="major_header_text">About</li></a>
          <a href="events.php"><li class="major_header_text">Events</li></a>
          <a href="calendar.html"><li class="major_header_text">Calendar</li></a>
          <a href="contact.php"><li class="major_header_text">Contact</li></a>
      </ul>
    </div><!-- end toggled_nav -->
    <header class="full_width_container">
        <nav id="main_site_nav">
            <div id="nav_toggle">
                <div class="toggle_item"></div>
                <div class="toggle_item"></div>
                <div class="toggle_item"></div>
            </div><!-- end nav_toggle -->
            <a href="../index.php"><img id="v" src="../imgs/v_orange.png">
            <img id="vsm" src="../imgs/vsm_logo_orange.png"></a>
       <div id="social">
            <div id="facebook" class="social_item">
                <a target="_blank" href="https://www.facebook.com/login.php?next=https%3A%2F%2Fwww.facebook.com%2Fgroups%2F282004171822761%2F"><img src="../imgs/vision_social_sprite_fb.png"/></a>
            </div>
            <div id="twitter" class="social_item">
               <a target="_blank" href="https://twitter.com/vsm411"><img src="../imgs/vision_social_sprite_twitter.png"/></a>
            </div>
            <div id="insta" class="social_item">
                <a href="https://instagram.com/vsm_nashville/" target="_blank"><img src="../imgs/insta_light.png"/></a>
            </div>
        </div>
        </nav><!-- end main_site_nav -->
    </header>

      <div id="main_content" class="sub_page">
           <div id="sign_up_heading">
                <h1 class="major_header_text">Sign Up</h1>
           </div><!-- end sign_up_heading -->
           <div id="sign_up_form_wrapper">
             <div id="error-msg">
             </div>
              <form id="sign_up_form" method="post">
                  <p class="form_label">First Name:</p>
                  <input id="first-name" type="text" placeholder="First Name" name="first_name"/><br>
                  <p class="form_label">Last Name:</p>
                  <input id="last-name" type="text" placeholder="Last Name" name="last_name"/><br>
                  <p class="form_label pre-check">I am signing up for:</p>
                  <?php print($events->get_event_sign_up_display()); ?>
                  <input type="submit" value="Submit" id="sign_up_submit" name="submit_sign_up">
              </form>
          </div><!-- end sign_up_form_wrapper -->
      </div><!-- end main_content-->

    </div><!-- end content_wrap -->
     <footer class="full_width_container">
           <p id="footer_text" class="main_text">Vision Student Ministries &copy;</p>
        <a href="http://bledsoedesigns.com" target="_blank" ><p id="bledsoe_link" class="main_text">Handcrafted by Bledsoe Designs</p></a>
    </footer>
          <script type="text/javascript">
        var pageId = "Events";
    </script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="../scripts/scripts.js"></script>
<script src="../scripts/sign_ups.js"></script>
</body>
</html>
