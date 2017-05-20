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
  public function add_event($data=array()){
    // set defaults
    $required_fields = array('title', 'location', 'date', 'time', 'fee');
    $escaped_values = array();
    $api_key = $this->config->apikey;
    $output = array();
    $post_api_key = $data['apikey'];
    $post_data_valid = true;

    // Be sure we have valid api key
    if($post_api_key !== $api_key){
      $output = array('error'=>1,'msg'=>'Invalid api key.');
      return print(json_encode($output));
    }

    // // validate required fields
    foreach($required_fields as $field){
      // if field has no value, fail validation
      if(!isset($data[$field]) || empty($data[$field])){
        $post_data_valid = false;
      }
    }

    // If we failed validation, return early
    if(!$post_data_valid){
      $output = array('error'=>1,'msg'=>'Missing required fields.');
      return print(json_encode($output));
    }

    // get and escape data from post
    foreach($required_fields as $field){
      $escaped_values[] = mysqli_real_escape_string($this->connection, $data[$field]);
    }

    // insert record
    $event_table = $this->config->event_table;
    $values = "'".join("','", $escaped_values)."'";
    $query = "INSERT INTO $event_table (title, location, date, time, fee)
              VALUES ($values)";
    $result = mysqli_query($this->connection, $query);
    $output['result_error'] = mysqli_error($this->connection);

    $output['error'] = 0;
    $output['query_that_ran'] = $query;
    $output['add_event_methodhasbeencalled'] = 0;
    $output['data'] = $data;
    $output['api_key_that_was_pasesed'] = $data['apikey'];

    return print(json_encode($output));
  }
}

?>
