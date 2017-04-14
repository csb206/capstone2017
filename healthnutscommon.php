<?php
	/*
	Health Nuts Common PHP Functions
	*/

	//Writes the html contents of the header of the page
	session_start();
	function write_header() {
		?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Health Nuts</title>
		<link href="healthnuts.css" type="text/css" rel="stylesheet" />
		<link href="/kinders/tdxuw/images/tdxuwlogo.png" 
			type="image/ico" rel="shortcut icon" />
		<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
		<script type="text/javascript" src="https://sdk.clarifai.com/js/clarifai-latest.js"></script>
		<script src="healthnuts.js" type="text/javascript"></script>
	</head>

	<body>
		<div id="wrapper">
			<div id="topnavarea">
				<div id="logoarea">
					<a href="tdxuw.php">
						<img src="/kinders/i491/images/hnlogo.png" id="leftlogo" alt="logo">
					</a>
				</div>
				<div id="loginarea">
					<?php
						if (isset($_SESSION['userid'])) {
							?>
							<a href="/myaccount/myaccount.php" id="nav_myaccount">MyAcct</a>
							<a href="logout.php" id="nav_signout">Logout</a>
							<?php
						} else {
							?>
							<form id="loginform" action="login.php" method="post">
								<input name="username" type="text" size="8" autofocus="autofocus" placeholder="User Name" />
								<input name="password" type="password" size="8" placeholder="Password" />
								<input type="checkbox" name="remember" value="true" checked />Remember Me?
								<input type="submit" value="Log in" />
							</form>
							<?php
						}
						if (isset($_SESSION["errors"])) {
							?>
							<p id="loginerror"><?= $_SESSION["errors"] ?></p>
							<?php
						}
					?>
				</div>
				<div id="topnavbuttons">
					<a href="tdxuw.php" id="nav_home"></a>
					<!--
					<a href="/gear/gear.php" id="nav_gear"></a>
					<a href="/events/events.php" id="nav_events"></a>
					<a href="tdxuw.php/donate/" id="nav_donate"></a>
					<a href="tdxuw.php/contact/" id="nav_contact"></a>
					-->
				</div>
			</div>
		<?php }

	//Writes the html contents of the footer of the page
	function write_footer() {
		?>
		<div id="footerarea">
			<br />

			<br />

			<p>
				Scott Kinder and Cory Brown Capstone 2017
			</p>
		</div>
	</body>
</html>
	<?php }
	//corrects data
	function test_input($data) {
		$oldData = $data;
		$data = trim($data);
		$data = stripslashes($data);
		$data = htmlspecialchars($data);
		if (!($oldData == $data)) {
			//report error with ip address and data, and timestamp (Not oldData! :))
		}
		return $data;
	}
?>