<?php
	/*
	Single page demoing Clarifai API
	*/
	date_default_timezone_set('America/Los_Angeles');
	require_once("healthnutscommon.php");

	/*
	$db_host = "kinders.vergil.u.washington.edu";
	$db_username = "root";
	$db_pass = "sd1ee4an94";
	$db_name = "tdxuw";

	try {
	    $db = new PDO("mysql:dbname=$db_name;port=5794;host=$db_host", "$db_username", "$db_pass");
	} catch (PDOException $e) {
	    print "Error!: " . $e->getMessage() . "<br/>";
	    die();
	}
	*/

	session_start();
	//writes the page header
	write_header();
	?>
	<div id="content">
		<h1>Upload Image</h1>
		<input id="imageinput">
		<button id="imageupload">Upload Image</button>
		<div id="imagewrapper"></div>
	</div>
	<?
	//Writes the footer for the page
	write_footer();

	//Clears errors
	$_SESSION["errors"] = null;
?>