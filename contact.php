<?php
  // Import PHPMailer classes into the global namespace
  // These must be at the top of your script, not inside a function
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\SMTP;
  use PHPMailer\PHPMailer\Exception;

  // Load Composer's autoloader
  require "vendor/autoload.php";

  header('Content-Type: application/json');

  // Instantiation and passing `true` enables exceptions
  $mail = new PHPMailer(true);

  $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
  $dotenv->load();

  $from = $_ENV['EMAIL_FROM'];
  $to = $_ENV['EMAIL_TO'];

  $email = $_POST["email"];
  $car = $_POST["car"];
  $city = $_POST["city"];
  $opt = $_POST["opt"];
  $color = $_POST["color"];

  try {
    //Server settings
    // $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->isSMTP();
    $mail->SMTPAuth    = false;
    $mail->SMTPSecure  = false;
    $mail->SMTPAutoTLS = false;
    $mail->Port        = 25;

    //Recipients
    $mail->setFrom("$from", "Website Visitor");
    // TODO: back to gmail
    $mail->addAddress("$to", "$name");
    // $mail->addReplyTo("$email", "$name");


    // Content
    // $mail->isHTML(true);
    $mail->Subject = "Zurikate $subject";
    $mail->Body    = "$email - $car - $city - $color - $opt";
    $mail->AddAttachment( $_FILES['file_vehicle']['tmp_name'], $_FILES['file_vehicle']['name']);
    $mail->AddAttachment( $_FILES['file_wheel']['tmp_name'], $_FILES['file_wheel']['name']);

    $mail->send();
    echo json_encode(Array("success" => true));
  } catch (Exception $e) {
    echo json_encode(Array("error" => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"));
  }

  exit;