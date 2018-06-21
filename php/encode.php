<?php
function url_encode($str) {  
	if(is_array($str)) {  
		foreach($str as $key=>$value) {  
			$str[urlencode($key)] = url_encode($value);  
		}  
	} else {  
		$str = urlencode($str);  
	}  
	return $str;
}
function encode_json($str) {  
	$result = urldecode(json_encode(url_encode($str)));  
	return $result; 
}  
?>