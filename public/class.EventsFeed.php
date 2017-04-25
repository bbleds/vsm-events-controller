<?php

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
    $query = "SELECT * FROM  $event_table WHERE `date` > NOW() ORDER BY `date` ASC";
    $result = mysqli_query($this->connection, $query);

    return $result;
  }

  /**
   * EventsFeed::get_event_list_display()
   *
   * Get events and output in list format
   *
   * @return string $output
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

  /**
   * EventsFeed::get_event_sign_up_display()
   *
   * Output sign up listing for events
   *
   * @return $output
   */
  public function get_event_sign_up_display(){
    $events_resp = $this->get_events();
    $output = "";

    while($row = mysqli_fetch_array($events_resp)){
      $id = $row['id'];
      $title = $row['title'];

      $output .= <<<EOF
      <p class='event_title'>$title <input id='$id' type='checkbox'  class='checkbox' name='add[]' value='$id'/><label for='$id'/></label></p>
EOF;

    }
    return $output;
  }
}

?>
