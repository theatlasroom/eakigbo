<?php 
	$position = (isset($_GET['pos'])) ? trim($_GET['pos']) : "-- insert position here --";
?>
<!DOCTYPE html>
<html class="no-js" lang="en">
	<head>
		<title>Ezekiel Kigbo | Portfolio | Cover Letter</title>					
		<!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame
		Remove this if you use the .htaccess -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />		
		<meta name="description" content="Ezekiel Kigbo Design Portfolio" />
		<meta name="author" content="Ezekiel Kigbo" />
		<meta name="keywords" content="Ezekiel Kigbo, web design, portfolio, music, design" />
		<meta name="viewport" content="width=device-width, initial-scale=0.75" />
		<!-- Replace favicon.ico & apple-touch-icon.png in the root of your domain and delete these references -->
		<link rel="shortcut icon" href="favicon.ico" />
		<link rel="apple-touch-icon" href="pics/apple-touch-icon.png" />
		<!--Import the css stylesheet for the site-->
		<link rel="stylesheet" href="css/generic-reset.css" />		
		<link rel="stylesheet" href="css/eakigbo-style.css" />
		<link rel="stylesheet" href="css/cv.css" />
		<!--add a basic modernizr instance for the html5 shiv, audio and video support-->
		<script type="text/javascript" src="js/modernizr.video-audio.js"></script>
	</head>
	<body>
		<div id="container">
			<nav class="fullscreen-navigation">
				<div class="wrapper">
				<ul>
					<li><a href="index.php#home">Home</a></li>
					<li><a href="cv.php">CV</a></li>															
				</ul>
				</div>				
			</nav>
			<section id="cv" class="content">
			<nav id="resume-nav">
				<h2><a href="#">Cover Letter</a></h2>					
				<ul>						
					<li><a id="print-page" href="#">Save / Print</a></li>				
				</ul>
				<p>theatlasroom@gmail.com</p>					
			</nav>				
			<div id="logo">
				<img src="pics/ek-white.png" alt="Ezekiel Kigbo - Web sound and interaction" />					
			</div>					
			<section id="cv-content">
				<div id="about-me" class="cv-content-section">
					<h3>Cover Letter</h3>
					<h6>Ezekiel Angbashim Kigbo Jr.</h6>
					<p>theatlasroom@gmail.com / @theatlasroom / eakigbo.me</p>							
					<p>I would like to apply for the position of <?php echo $position; ?> that I saw advertised.</p>
					<p>I believe I would be a strong candidate for this position based on my previous and current work experience and interest in both the job and the area of work.</p>
					<p>I have been working in web design and development for the past 4 years in both professional and freelance roles and have taken a particular interest in Front end development. I enjoy the challenge of designing the simplest and most effective user interfaces and would like to further explore how web technology can support and enhance the user experience.</p>
					<p>My relevant work and study experiences include</p>
					<ul>	
						<li>Library online communications officer at the La trobe University (Current position)</li>
						<li>Centre for teaching and learning Web productions officer at the University of Newcastle</li>
						<li>Information common rover at the University of Newcastle providing staff and student IT help and support</li>
						<li>Checkout operator at Woolworths focusing on providing a high level of customer service</li>
						<li>A Bachelors degree in Computer Science at the University of Newcastle</li>				
						<li>Various freelance projects for artists, musicians and businesses such as McDonalds Australia</li>										
					</ul>
					<p>Thanks for taking the time to read this and I hope you will take the time to look at my resume.</p>
					<p>Kind regards</p>					
				</div>								
			</section>	
			<footer>
				<p>Ezekiel Angbashim Kigbo Jr.<br/>
					theatlasroom@gmail.com<br/>
					<?php echo date("jS F, Y"); ?>
				</p>
										
			</footer>				

			</section>							
		</div>				
	<!--Load jquery library-->	
	<script type="text/javascript" src="js/jquery.js"></script>
	<!--execute custom scripts on page load-->
	<script type="text/javascript" src="js/jquery.polytools.slider.js"></script>	
	<script type="text/javascript" src="js/scripts.js"></script>
	<!--TYPEKIT CODE, NEEDS TO BE UNCOMMENTED-->	
	<script type="text/javascript" src="http://use.typekit.com/tuh6nqt.js"></script>
	<script type="text/javascript">try{Typekit.load();}catch(e){}</script>
	<!--Google analytics tracking data-->
	<script type="text/javascript">
	
	  var _gaq = _gaq || [];
	  _gaq.push(['_setAccount', 'UA-28194714-1']);
	  _gaq.push(['_setDomainName', 'eakigbo.me']);
	  _gaq.push(['_trackPageview']);
	
	  (function() {
	    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	  })();
	
	</script>			
	</body>
</html>
