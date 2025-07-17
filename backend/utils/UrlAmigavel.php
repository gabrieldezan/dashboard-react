<?php

function UrlAmigavel($texto) {
    // Converter para minúsculas
    $texto = strtolower($texto);

    // Remover acentos e caracteres especiais
    $texto = preg_replace('/[áàãâä]/u', 'a', $texto);
    $texto = preg_replace('/[éèêë]/u', 'e', $texto);
    $texto = preg_replace('/[íìîï]/u', 'i', $texto);
    $texto = preg_replace('/[óòõôö]/u', 'o', $texto);
    $texto = preg_replace('/[úùûü]/u', 'u', $texto);
    $texto = preg_replace('/[ç]/u', 'c', $texto);
    $texto = preg_replace('/[ñ]/u', 'n', $texto);

    // Remover caracteres especiais e substituir espaços por hífens
    $texto = preg_replace('/[^a-z0-9\s-]/', '', $texto);
    $texto = preg_replace('/[\s-]+/', '-', $texto);

    // Remover hífens no início e no final
    $texto = trim($texto, '-');

    return $texto;
}