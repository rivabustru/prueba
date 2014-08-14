<?php
// Get these from http://developers.facebook.com
$api_key = '2c73ae8529134daaaaaaaaaaaaaaaaaa';
$secret  = '3c041a7caaaaaaaaaaaaaaaaaaaaaaaa';

include_once './facebook-platform/php/facebook.php';

$facebook = new Facebook($api_key, $secret);
$user = $facebook->require_login();

?>
<h1>Prueba</h1>
Hello <fb:name uid='<?php echo $user; ?>' useyou='false' possessive='true' />! <br>
Your id : <?php echo $user; ?>.<br>

Your friend list:<br>
<?
$fls = $facebook->api_client->friends_getLists();
?>
<?
echo "<h4>Return array from Facebook</h4>";
print_r($fls);
?>
<h4>Check Result</h4>
<ul>
<?
foreach($fls as $fl){
	echo "<li>".$fl['name']."</li>";		
}
?>
</ul>
