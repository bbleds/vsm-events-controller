<?php
// api to handle routing for events
require_once("./class.EventsAPI.php");
$config = require_once('../config.php');

// get route passed in
$query_params = $_GET;
$action = $query_params['action'];
$error = array('msg'=>'API method not found.', 'error'=>1);
$api = new EventsAPI($config);

// replace dash characters with underscores
$action =  preg_replace('/(-)/', '_', $action);

// check if api method exists
if(!method_exists($api, $action)){
  return print(json_encode($error));
}

// call method
$api->$action();

?>
