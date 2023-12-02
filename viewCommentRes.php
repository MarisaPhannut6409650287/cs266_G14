<!DOCTYPE html>
<html lang="en">
<?php
include("connection/connect.php");
include_once 'product-action.php';
error_reporting(0);
session_start();
$resID = $_GET['res_id'];

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

    <?php $ress = mysqli_query($db, "select * from restaurant where rs_id=$resID");
    $rows = mysqli_fetch_array($ress);
    ?>
    <a href="restaurants.php"><img src="images/arrowLeft.png" id="returnPage"></a>

    <br><br><br><br><br>
    <div id=" resInfo">
        <?php echo '<img src="admin/Res_img/' . $rows['image'] . '" alt="Restaurant logo" style="width:80%;" >'; ?><br>
        <h3>
            <?php echo $rows['title']; ?>
        </h3>
        <p id="address">
            <?php echo $rows['address']; ?>
        </p>
    </div><br><br>
    <div id="review">
        <br>
        <h4> Write review our restaurant here! </h4>

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
                    <!--<h6 id="message" style="color: green">Send Comment Successfully</h6>-->
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
            <button type="submit" class="btn btn-success" id="commentButtn" name="send">Send Review</button>
        </form><br>
    </div>
    <br><br>
    <?php
    $count = mysqli_query($db, "SELECT COUNT(commentID) AS commentCount FROM commentRes WHERE resID=$resID");
    $rowCount = mysqli_fetch_assoc($count);
    $commentCount = $rowCount['commentCount'];

    $sum = mysqli_query($db, "SELECT SUM(point) AS totalPoint FROM commentRes WHERE resID=$resID");
    $rowSum = mysqli_fetch_assoc($sum);
    $sumPoint = $rowSum['totalPoint'];

    $avg = ($commentCount > 0) ? $sumPoint / $commentCount : 0;
    $avgFormatted = number_format($avg, 1);

    $distance = $avgFormatted - floor($avgFormatted);
    if ($distance >= 0.5) {
        $finalAvgStar = ceil($avgFormatted);
    } else {
        $finalAvgStar = floor($avgFormatted);
    }
    ?>

    <h1 id="avgPoint">
        <?php echo $avgFormatted; ?>/5.0
    </h1>
    <div id="avgStar">
        <?php
        for ($i = 1; $i <= 5; $i++) {
            echo '<span class="fa fa-star ' . ($i <= $avg ? 'checked' : '') . '"></span>';
        }
        ?>
    </div><br>
    <h2 id="count">
        <?php echo $commentCount; ?> Review
    </h2>
    <br><br>

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
            <p id="time" style="color: gray;">
                <?php echo $rowComment1['time']; ?>
            </p><br>
            <?php
            $rating = $rowComment1['point'];
            for ($i = 1; $i <= 5; $i++) {
                echo '<span class="fa fa-star ' . ($i <= $rating ? 'checked' : '') . '"></span>';
            }
            ?>
            <div id="detail">
                <p id="displayDetail">
                    <b id="commentType" style="color: #4B6E99;">
                        <?php echo $rowComment1['type']; ?>
                    </b>&nbsp;&nbsp;&nbsp;&nbsp;
                    <?php echo $rowComment1['detail']; ?>
                </p>

            </div>
            <hr id="underView"><br>

            <?php
        }
        ?>

    </div>
    <p style="margin-bottom: 58px; font-size: 18px;">End Review</p>

    <script>
        $(document).ready(function () {
            $('.stars a').on('click', function (e) {
                e.preventDefault(); // Prevent the default behavior

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

    #returnPage {

        float: left;
        margin-left: 50px;
        margin-top: 50px;
        width: 24px;
        height: 24px;
    }

    #returnRes {
        text-align: left;
        margin-left: 50px;
        margin-top: 50px;
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

    #review {
        border: 3px solid rgba(0, 0, 0, 0.1);
        ;
        /* Set the thickness and color of the border */
        padding: 18px;
        /* Optional: Add padding inside the border */
        margin: 30px;
    }

    #underView {
        margin-right: 80px;
    }


    #address {
        font-size: 30px;
        font-weight: 500;

    }

    #avgPoint {
        font-family: 'Source Sans 3', sans-serif;
        font-weight: 800;
        text-align: center;
        color: #F2A918;
    }

    #avgStar {
        text-align: center;
        font-size: 26px;
    }

    #count {
        font-family: 'Source Sans 3', sans-serif;
        font-weight: 800;
        text-align: center;
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

    #commentType {
        text-align: left;
        font-size: 18px;
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
        color: gold !important;
    }

    span.active a:after,
    .stars a.active:after {
        color: gold;
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
        text-align: left;
        margin-left: 80px;
        /* Adjust the margin as needed */

        /* Responsive margin adjustment */
        @media (max-width: 1000px) {
            margin-left: 80px;
            /* Adjust the margin for smaller screens */
        }

    }

    #displayDetail {
        text-align: left;
        margin-left: 0px;
        /* Adjust the margin as needed */

        /* Responsive margin adjustment */
        @media (max-width: 1000px) {
            margin-left: 0px;
            /* Adjust the margin for smaller screens */
        }
    }

    #detail p {
        margin-bottom: 5px;
        /* Adjust the value as needed */
    }

    #detail .star-rating {
        margin-top: -2px;
        /* Adjust the value as needed */
    }

    .fa {
        color: #9e9e9e;
    }

    .checked {
        color: gold;
    }
</style>