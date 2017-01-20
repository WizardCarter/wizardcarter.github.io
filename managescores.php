$name = $_POST['name'];
$score = $_POST['score'];
$myfile = fopen("scores.txt", "a") or die("Unable to open file!");
$txt = $name + "|" + $score;
fwrite($myfile, "\n". $txt);
fclose($myfile);
