<?php
// methods for getting and listing events

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

class EventsAPI {
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
   * EventsAPI::events_list
   *
   * returns json data feed for all available events
   *
   */
  public function events_list(){
    // get all current events
    $event_table = $this->config->event_table;
    $query = "SELECT * FROM  $event_table WHERE `date` > NOW() ORDER BY `date` ASC";
    $result = mysqli_query($this->connection, $query);
    $output = array();

    if(!$result){
      $output['msg'] = 'No events found';
      $output['error'] = 1;
      return print(json_encode($output));
    }

    // build output array
    while($row = mysqli_fetch_assoc($result)){
      $output[] = $row;
    }

    return print(json_encode($output));
  }

  /**
   * EventsAPI::add_event()
   *
   * Allows adding new event to current events
   *
   * @param array $data
   * @return string $output
   */
  public function add_event($data){
    $required_fields = array('title', 'date');
    $api_key = $this->config->apikey;


    $output = array();
    $output['success'] = 1;
    $output['error'] = 0;

    return print(json_encode($output));
  }
}

?>
