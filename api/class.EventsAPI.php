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
   * @return array $output
   */
  public function add_event($data=array()){
    // set defaults
    $required_fields = array('title', 'location', 'date', 'time', 'fee');
    $output_fields_to_renmove = array('apikey','action');
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

    // validate required fields
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
    $result_error = mysqli_error($this->connection);

    // handle sql insert error
    if($result_error){
      $output = array('error'=>1,'msg'=>'An error occurred when inserting your new event. Please contact support.');
      return print(json_encode($output));
    }

    // remove any unwanted fields from return data
    foreach($output_fields_to_renmove as $field){
      unset($data[$field]);
    }

    $output = array('data'=>$data, 'error'=>0);
    return print(json_encode($output));
  }

  /**
   * EventsAPI::update_event()
   *
   * Allows updating existing event in current events
   *
   * @param array $data
   * @return string $output
   */
  public function update_event($data=array()){
    // set defaults
    $required_fields = array('title', 'location', 'date', 'time', 'fee', 'eventid');
    $output_fields_to_renmove = array('apikey','action');
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

    // validate required fields
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
      $escaped_values[$field] = mysqli_real_escape_string($this->connection, $data[$field]);
    }

    // handle update
    $event_table = $this->config->event_table;

    $existing_id = $escaped_values['eventid'];
    unset($escaped_values['eventid']);

    // build update string as mysql_colname=val
    $cols_and_values = array();
    foreach($escaped_values as $k=>$v) $cols_and_values[] = "$k='$v'";
    $cols_and_values = join(",", $cols_and_values);

    // update in db
    $query = "UPDATE $event_table SET $cols_and_values WHERE id=$existing_id";
    $result = mysqli_query($this->connection, $query);
    $result_error = mysqli_error($this->connection);

    // handle sql insert error
    if($result_error){
      $output = array('error'=>1,'msg'=>'An error occurred when inserting your new event. Please contact support.');
      return print(json_encode($output));
    }

    // remove any unwanted fields from return data
    foreach($output_fields_to_renmove as $field){
      unset($data[$field]);
    }

    $output = array('data'=>$data, 'error'=>0);
    return print(json_encode($output));
  }
}

?>
