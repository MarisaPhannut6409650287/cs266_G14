<?php
include("connection/connect.php");
session_start();

if (isset($_POST['search'])) {
    $search = mysqli_real_escape_string($db, $_POST['search']);
    $res_id = isset($_POST['res_id']) ? $_POST['res_id'] : null;

    $query = "SELECT * FROM dishes WHERE title LIKE '%$search%' AND rs_id=$res_id";
    $result = mysqli_query($db, $query);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            echo '<div class="food-item">';
            echo '<div class="row">';
            echo '<div class="col-xs-12 col-sm-6 col-lg-6">';
            echo '<form method="post" action="dishes.php?res_id=' . $_GET['res_id'] . '&action=add&id=' . $row['d_id'] . '">';
            echo '<div class="rest-logo pull-left">';
            echo '<a class="restaurant-logo pull-left" href="#"><img src="admin/Res_img/dishes/' . $row['img'] . '" alt="Food logo"></a>';
            echo '</div>';
            echo '<div class="rest-descr">';
            echo '<h6><a href="#">' . $row['title'] . '</a></h6>';
            echo '<p>' . $row['slogan'] . '</p>';
            echo '</div>';
            echo '</div>';
            echo '<div class="col-xs-6 col-sm-2 col-lg-2 text-xs-center">';
            echo '<span class="price pull-left">$' . $row['price'] . '</span>';
            echo '</div>';
            echo '<div class="col-xs-6 col-sm-4 col-lg-4">';
            echo '<div class="row no-gutter">';
            echo '<div class="col-xs-7">';
            echo '<select class="form-control b-r-0" id="exampleSelect' . $row['d_id'] . '">';
            echo '<option>Size SM</option>';
            echo '<option>Size LG</option>';
            echo '<option>Size XL</option>';
            echo '</select>';
            echo '</div>';
            echo '<div class="col-xs-5">';
            echo '<input class="form-control" type="number" value="0" id="quant-input-' . $row['d_id'] . '">';
            echo '</div>';
            echo '</div>';
            echo '</div>';
            echo '</div>';
            echo '<button type="submit" class="btn theme-btn" style="margin-left: 40px;">Add To Cart</button>';
            echo '</form>';
            echo '</div>';
            echo '</div>';
        }
    } else {

        echo '<div class="alert alert-warning" role="alert">';
        echo 'No menu items found.';
        echo '</div>';
    }

    mysqli_close($db);
}
?>