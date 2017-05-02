<?php
// api to handle routing for events
require_once("./class.EventsAPI.php");
$config = require_once('../config.php');

// get route passed in
$query_params = $_GET;
$action = isset($_POST['action']) ? $_POST['action'] : $query_params['action'];
$error = array('msg'=>'API method not found.', 'error'=>1);
$api = new EventsAPI($config);

// replace dash characters with underscores
$action =  preg_replace('/(-)/', '_', $action);

// check api key if post
if($_POST){
  if($_POST['apikey'] !== $config->apikey){
    $error['msg'] = 'Invalid API key, please obtain a valid API key.';
    return print(json_encode($error));
  }
}

// check if api method exists
if(!method_exists($api, $action)){
  return print(json_encode($error));
}

// call method
$api->$action();
?>
