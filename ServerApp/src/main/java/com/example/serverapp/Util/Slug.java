package com.example.serverapp.Util;

import java.text.Normalizer;
import java.util.Locale;
import java.util.regex.Pattern;

public class Slug {
    Pattern NONLATIN = Pattern.compile("[^\\w-]");
    Pattern WHITESPACE = Pattern.compile("[\\s]");

    public String generate(String input) {
        String nowhitespace = WHITESPACE.matcher(input).replaceAll("-");
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        String slug = NONLATIN.matcher(normalized).replaceAll("");
        return slug.toLowerCase(Locale.ENGLISH);
    }
}
