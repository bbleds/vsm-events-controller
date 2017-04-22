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
   * EventsFeed::get_events()
   *
   * Gets all current events
   *
   * @return array $resp
   */
  public function get_events($config, $connection){
    // get all current events
    $event_table = $config->event_table;
    $query = "SELECT * FROM  $event_table";
    $result = mysqli_query($connection, $query);

    return $result;
  }
}

print_r(EventsFeed::get_events($config, $connection));


?>
