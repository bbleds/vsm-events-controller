<?php

// methods for getting and listing events
$config = require_once('../config.php');

// connect to db
$connection = mysqli_connect($config->host, $config->username, $config->pass, $config->database);

/**
 * Events Feed
 *
 * Responsible for producing feed of events to pass to listing pages
 *
 */
class EventsFeed {

  /**
   * EventsFeed::__construct()
   *
   * Set defaults
   *
   */
  public function __construct($config){
    $this->connection = mysqli_connect($config->host, $config->username, $config->pass, $config->database);
    $this->config = $config;
  }

  /**
   * EventsFeed::get_events()
   *
   * Gets all current events
   *
   * @return array $resp
   */
  function get_events(){
    // get all current events
    $event_table = $this->config->event_table;
    $query = "SELECT * FROM  $event_table";
    $result = mysqli_query($this->connection, $query);

    return $result;
  }

  /**
   * EventsFeed::get_event_list_display()
   *
   * Get events and output in list format
   *
   * @param type var Description
   * @return return type
   */
  function get_event_list_display(){
    $events_resp = $this->get_events();
    $output = "";

    // if events exist, build list
    if($events_resp){
      while($row = mysqli_fetch_array($events_resp)){

        $title = $row['title'];
        $location = $row['location'];
        $date = date("m/d/Y", strtotime($row['date']));
        $time = $row['time'];
        $fee = $row['fee'];

        $output .= <<<EOF
        <div class="event_item">
          <p class='main_text title'>$title</p>
          <p  class='main_text location'>Location: <span>$location</span></p>
          <p  class='main_text date'>Date: <span>$date</span></p>
          <p  class='main_text time'>Time: <span>$time</span></p>
          <p  class='main_text fee'>Fee: <span>$fee</span></p>
          <a href='sign_up.php'><button>Sign Up</button></a>
        </div>
EOF;
      }
    }

    return $output;
  }
}

$events = new EventsFeed($config);
print($events->get_event_list_display());

?>
