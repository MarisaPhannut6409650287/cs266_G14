<!DOCTYPE html>
<html lang="en">
<?php
include("connection/connect.php");
include_once 'product-action.php';
error_reporting(0);
session_start();
?>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
</head>

<body>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
        integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
        integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
        crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

    <?php $ress = mysqli_query($db, "select * from restaurant where rs_id='$_GET[res_id]'");
    $rows = mysqli_fetch_array($ress);
    ?>
    <div id=" resInfo">
        <?php echo '<img src="admin/Res_img/' . $rows['image'] . '" alt="Restaurant logo" style="width:80%;" >'; ?><br>
        <h3>
            <?php echo $rows['title']; ?>
        </h3>
        <p id="address">
            <?php echo $rows['address']; ?>
        </p>
    </div><br><br><br>
    <div id="review">
        <h4> Comment our restaurant </h4>
        <?php
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            if (empty($_SESSION["user_id"])) {
                $userN = "Anonymous";
                //echo "userID not found: " . $userN;
            } else {
                $userid = $_SESSION["user_id"];
                $userQuery = $db->prepare("SELECT username FROM users WHERE u_id = ?");
                $userQuery->bind_param("s", $userid);
                $userQuery->execute();
                $userQuery->bind_result($username);
                $userQuery->fetch();
                $userQuery->close();

                $userN = $username;
                //echo "User: " . $userN;
            }

            if (isset($_POST["send"])) {
                $rate = $_POST["rating"];
                $type = $_POST["type"];
                $detail = $_POST["detail"];
                $date = date("Y-m-d");
                $resID = $_GET['res_id'];

                if (empty($type) || empty($detail) || empty($rate)) {
                    ?>
                    <h6 id="message" style="color: red ;">Please fill in all required fields</h6>
                    <?php
                } else {
                    $sqlInsert = $db->prepare("INSERT INTO commentRes(username, resID, type, detail, time, point) 
                                       VALUES (?, ?, ?, ?, ?, ?)");

                    $sqlInsert->bind_param("ssssss", $userN, $resID, $type, $detail, $date, $rate);

                    $sqlInsert->execute();
                    ?>
                    <h6 id="message" style="color: green">Send Comment Successfully</h6>
                    <?php
                }
            } else { ?>
                <h6 id="message">Rating parameter is missing in the form submission</h6>
                <?php
            }
        }
        ?>

        <form action="" method="post" id="formSubmit">
            <div class="input-group mb-3" id="comment">
                <select class="form-select" id="inputGroupSelect01" name="type">
                    <option selected>What Comment?</option>
                    <option value="Service">Service</option>
                    <option value="Food">Food</option>
                </select>
                <input type="text" class="form-control" aria-label="Text input with dropdown button" name="detail">
            </div><br>
            <h5>Rate us now!!</h5>
            <p class="stars">
                <span>
                    <a class="star-1" href="#" data-rating="1">1</a>
                    <a class="star-2" href="#" data-rating="2">2</a>
                    <a class="star-3" href="#" data-rating="3">3</a>
                    <a class="star-4" href="#" data-rating="4">4</a>
                    <a class="star-5" href="#" data-rating="5">5</a>
                </span>
            </p>
            <input type="hidden" name="rating" id="ratingInput" value="">
            <button type="submit" class="btn btn-success" id="commentButtn" name="send">Send Comment</button>
    </div>
    </form><br>
    <?php
    $comment = mysqli_query($db, "select * from commentRes where resID='$_GET[res_id]'");
    ?><br>

    <div id="displayComment">
        <?php
        while ($rowComment1 = mysqli_fetch_array($comment)) {
            ?>

            <h6 id="user">
                <?php echo $rowComment1['username']; ?>
            </h6>
            <p id="time">
                <?php echo $rowComment1['time']; ?>
            </p>
            <div id="detail">
                <b>
                    <?php echo $rowComment1['type']; ?>
                </b>
                <p>
                    <?php echo $rowComment1['detail']; ?>
                </p>
            </div><br>

            <?php
        }
        ?>

    </div>

    <script>
        $(document).ready(function () {
            $('.stars a').on('click', function () {
                $('.stars span, .stars a').removeClass('active');

                $(this).addClass('active');
                $('.stars span').addClass('active');
                var rating = $(this).data('rating');
                $('#ratingInput').val(rating);
            });

            $('#commentButtn').click(function () {
                $('#formSubmit').submit();
            });
        });
    </script>
</body>

</html>


<style>
    @import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;700&display=swap');

    img {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    h3,
    #address,
    h4,
    h5,
    h6,
    p {
        font-family: 'Source Sans 3', sans-serif;
        text-align: center;
    }

    h3 {
        font-weight: 800;
        font-size: 60px;
    }

    h4 {
        text-align: center;
        font-size: 30px;
    }

    h5 {
        font-size: 20px;
    }

    #address {
        font-size: 30px;
        font-weight: 500;

    }

    #review h4 {
        margin-bottom: 50px;
        font-weight: 800;
    }

    #comment {
        display: flex;
        max-width: 80%;
        margin: 0 auto;
    }

    #inputGroupSelect01 {
        max-width: 24%;
    }


    .stars {
        text-align: center;
    }

    .stars input {
        position: absolute;
        left: -999999px;
    }

    .stars a {
        display: inline-block;
        padding-right: 4px;
        text-decoration: none;
        margin: 0;
    }

    .stars a:after {
        position: relative;
        font-size: 18px;
        font-family: 'FontAwesome', serif;
        display: block;
        content: "\f005";
        color: #9e9e9e;
    }


    span {
        font-size: 0;
        /* trick to remove inline-element's margin */
    }

    .stars a:hover~a:after {
        color: #9e9e9e !important;
    }

    span.active a.active~a:after {
        color: #9e9e9e;
    }

    span:hover a:after {
        color: blue !important;
    }

    span.active a:after,
    .stars a.active:after {
        color: blue;
    }

    #commentButtn {
        display: block;
        margin: 0 auto;
    }

    #user,
    #time {
        display: inline-block;
        margin: 0;
    }

    #user {
        font-size: 22px;
        font-weight: 700;
    }

    #displayComment {
        text-align: center;
    }
</style>