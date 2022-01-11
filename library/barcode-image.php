<?php

wkwcpos_barcode_image($_GET['code']);

function wkwcpos_barcode_image($code_string)
{
    $print = 'false';
    $orientation = 'horizontal';
    $code_type = 'code128';
    $print = false;
    $SizeFactor = 1;
    $size = 20;
    $barcode_width = '';
    $filepath = '';

    if (isset($_GET['width'])) {
        $barcode_width = get_option('_pos_barcode_width');
    }

    // Pad the edges of the barcode
    $code_length = 20;
    if ($print) {
        $text_height = 30;
    } else {
        $text_height = 0;
    }

    for ($i = 1; $i <= strlen($code_string); ++$i) {
        $code_length = $code_length + (int) (substr($code_string, ($i - 1), 1));
    }

    if (strtolower($orientation) == 'horizontal') {
        if (empty($barcode_width)) {
            $barcode_width = $code_length * $SizeFactor;
        }
        $img_width = $barcode_width;
        $img_height = $size;
    } else {
        if (empty($barcode_width)) {
            $barcode_width = $size;
        }
        $img_width = $barcode_width;
        $img_height = $code_length * $SizeFactor;
    }

    $image = imagecreate($img_width, $img_height + $text_height);
    $black = imagecolorallocate($image, 0, 0, 0);
    $white = imagecolorallocate($image, 255, 255, 255);

    imagefill($image, 0, 0, $white);
    if ($print) {
        imagestring($image, 5, 31, $img_height, $text, $black);
    }

    $location = 10;
    for ($position = 1; $position <= strlen($code_string); ++$position) {
        $cur_size = $location + (substr($code_string, ($position - 1), 1));
        if (strtolower($orientation) == 'horizontal') {
            imagefilledrectangle($image, $location * $SizeFactor, 0, $cur_size * $SizeFactor, $img_height, ($position % 2 == 0 ? $white : $black));
        } else {
            imagefilledrectangle($image, 0, $location * $SizeFactor, $img_width, $cur_size * $SizeFactor, ($position % 2 == 0 ? $white : $black));
        }
        $location = $cur_size;
    }

    // Draw barcode to the screen or save in a file
    if ($filepath == '') {
        header('Content-type: image/png');
        imagepng($image);
        imagedestroy($image);
    } else {
        imagepng($image, $filepath);
        imagedestroy($image);
    }
}
