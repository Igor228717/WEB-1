<?php
/*
Задание 2
Присвоить переменной $а значение в промежутке [0..15]. 
С помощью оператора switch организовать вывод чисел от $a до 15.
*/
    $a = 8; 

    switch (true) {
        case $a == 0:  echo 0 . " ";
        case $a <= 1:  echo 1 . " ";
        case $a <= 2:  echo 2 . " ";
        case $a <= 3:  echo 3 . " ";
        case $a <= 4:  echo 4 . " ";
        case $a <= 5:  echo 5 . " ";
        case $a <= 6:  echo 6 . " ";
        case $a <= 7:  echo 7 . " ";
        case $a <= 8:  echo 8 . " ";
        case $a <= 9:  echo 9 . " ";
        case $a <= 10: echo 10 . " ";
        case $a <= 11: echo 11 . " ";
        case $a <= 12: echo 12 . " ";
        case $a <= 13: echo 13 . " ";
        case $a <= 14: echo 14 . " ";
        case $a <= 15: echo 15 . " ";
            break;
    }
?>