<?php

return PhpCsFixer\Config::create()
    ->setRules([
            '@PSR2' => true,
            // Exclude psr0 to avoid problems with namespaces under the "app" directory
            'psr0' => false,
            // PHP code MUST use only UTF-8 without BOM (remove BOM).
            'encoding' => true,
            // PHP multi-line arrays should have a trailing comma.
            'trailing_comma_in_multiline_array' => true,
            // All instances created with new keyword must be followed by braces.
            'new_with_braces' => true,
            // There should not be blank lines between docblock and the documented element.
            'no_blank_lines_after_phpdoc' => true,
            // There should not be space before or after object T_OBJECT_OPERATOR.
            'object_operator_without_whitespace' => true,
            // Binary operators should be surrounded by at least one space.
            'binary_operator_spaces' => true,
            // Scalar types should always be written in the same form. "int", not "integer"; "bool", not "boolean"; "float", not "real" or "double".
            'phpdoc_scalar' => true,
            // @type should always be written as @var.
            'phpdoc_no_alias_tag' => ['type' => 'var'],
            // Annotations in phpdocs should be ordered so that param annotations come first, then throws annotations, then return annotations.
            'phpdoc_order' => true,
            // An empty line feed should precede a return statement.
            'blank_line_before_return' => true,
            // Inside a classy element "self" should be preferred to the class name itself.
            'self_accessor' => true,
            // PHP single-line arrays should not have trailing comma.
            'no_trailing_comma_in_singleline_array' => true,
            // Convert double quotes to single quotes for simple strings.
            'single_quote' => true,
            // Replace all <> with !=.
            'standardize_not_equals' => true,
            // Arrays should be formatted like function/method arguments, without leading or trailing single line space.
            'trim_array_spaces' => true,
            // Unalign double arrow symbols.
            'binary_operator_spaces' => ['align_double_arrow' => false],
            // Unalign equals symbols.
            'binary_operator_spaces' => ['align_equals' => false],
            // Unused use statements must be removed.
            'no_unused_imports' => true,
            // Ordering use statements.
            'ordered_imports' => true,
            // PHP arrays should use the PHP 5.4 short-syntax.
            'array_syntax' => ['syntax' => 'short'],
            // Cast "(boolean)" and "(integer)" should be written as "(bool)" and "(int)". "(double)" and "(real)" as "(float)".
            'short_scalar_cast' => true,
        ])
    ->setUsingCache(true);
