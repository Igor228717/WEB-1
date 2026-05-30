<?php
/*
Задание 3
Объявить массив, индексами которого являются буквы русского языка, 
а значениями – соответствующие латинские буквосочетания 
(‘а’=> ’a’, ‘б’ => ‘b’, ‘в’ => ‘v’, ‘г’ => ‘g’, …, ‘э’ => ‘e’, ‘ю’ => ‘yu’, ‘я’ => ‘ya’).
Написать функцию транслитерации строк.
*/
    $translit = [
    'а' => 'a',  'б' => 'b',  'в' => 'v',  'г' => 'g',
    'д' => 'd',  'е' => 'e',  'ё' => 'yo', 'ж' => 'zh',
    'з' => 'z',  'и' => 'i',  'й' => 'y',  'к' => 'k',
    'л' => 'l',  'м' => 'm',  'н' => 'n',  'о' => 'o',
    'п' => 'p',  'р' => 'r',  'с' => 's',  'т' => 't',
    'у' => 'u',  'ф' => 'f',  'х' => 'kh', 'ц' => 'ts',
    'ч' => 'ch', 'ш' => 'sh', 'щ' => 'shch','ъ' => '',
    'ы' => 'y',  'ь' => '',   'э' => 'e',  'ю' => 'yu',
    'я' => 'ya',
];

function transliterat($stroka, $tablica) {
    $result = '';
    $len = mb_strlen($stroka, 'UTF-8');
    for ($i = 0; $i < $len; $i++) {
        $char = mb_substr($stroka, $i, 1, 'UTF-8');
        $lower = mb_strtolower($char, 'UTF-8');
        $trans = $tablica[$lower] ?? $char;
        
        // Если исходная буква была заглавной — делаем заглавной и первую букву транслита
        if ($char !== $lower && isset($tablica[$lower])) {
            $trans = mb_convert_case($trans, MB_CASE_TITLE, 'UTF-8');
        }
        $result .= $trans;
    }
    return $result;
}

$predlodgenie = "Клара у Карла украла кораллы";
echo "Исходная строка: " . $predlodgenie . "\n";
echo "Транслитерация: " . transliterat($predlodgenie, $translit) . "\n";
?>