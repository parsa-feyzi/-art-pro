<?php

declare(strict_types=1);

namespace Core\Validation;

use Core\Database\Database;

final class Validator
{
    public function __construct(
        private readonly array $data,
        private ?Database $db = null
    ) {
    }

    public function validate(array $rules): array
    {
        $errors = [];
        $validated = [];

        foreach ($rules as $field => $ruleSet) {
            $fieldRules = $this->normalizeRules($ruleSet);
            $isPresent = array_key_exists($field, $this->data);

            if (!$isPresent && in_array('sometimes', $fieldRules, true)) {
                continue;
            }

            if (!$isPresent) {
                if (in_array('required', $fieldRules, true)) {
                    $errors[$field][] = "The {$field} field is required.";
                }

                continue;
            }

            $value = $this->data[$field];

            if (in_array('trim', $fieldRules, true) && is_string($value)) {
                $value = trim($value);
            }

            $isEmpty = $value === null || $value === '';

            if ($isEmpty && in_array('required', $fieldRules, true)) {
                $errors[$field][] = "The {$field} field is required.";
                continue;
            }

            if ($isEmpty && in_array('nullable', $fieldRules, true)) {
                $validated[$field] = null;
                continue;
            }

            foreach ($fieldRules as $rule) {
                if (in_array($rule, ['sometimes', 'nullable', 'required', 'trim'], true)) {
                    continue;
                }

                if ($rule === 'string' && !is_string($value)) {
                    $errors[$field][] = "The {$field} field must be a string.";
                }

                if (
                    $rule === 'email'
                    && (!is_string($value) || !filter_var($value, FILTER_VALIDATE_EMAIL))
                ) {
                    $errors[$field][] = "The {$field} field must be a valid email address.";
                }

                if (
                    $rule === 'integer'
                    && !is_int($value)
                    && (!is_string($value) || filter_var($value, FILTER_VALIDATE_INT) === false)
                ) {
                    $errors[$field][] = "The {$field} field must be an integer.";
                }

                if (
                    $rule === 'boolean'
                    && !is_bool($value)
                    && !in_array($value, [0, 1, '0', '1'], true)
                ) {
                    $errors[$field][] = "The {$field} field must be true or false.";
                }

                if (str_starts_with($rule, 'min:')) {
                    $min = (int) substr($rule, 4);

                    if (is_string($value) && mb_strlen($value) < $min) {
                        $errors[$field][] = "The {$field} field must be at least {$min} characters.";
                    } elseif ((is_int($value) || is_float($value)) && $value < $min) {
                        $errors[$field][] = "The {$field} field must be at least {$min}.";
                    }
                }

                if (str_starts_with($rule, 'max:')) {
                    $max = (int) substr($rule, 4);

                    if (is_string($value) && mb_strlen($value) > $max) {
                        $errors[$field][] = "The {$field} field must not exceed {$max} characters.";
                    } elseif ((is_int($value) || is_float($value)) && $value > $max) {
                        $errors[$field][] = "The {$field} field must not exceed {$max}.";
                    }
                }

                if (str_starts_with($rule, 'in:')) {
                    $allowed = array_map('trim', explode(',', substr($rule, 3)));

                    if (!is_scalar($value) || !in_array((string) $value, $allowed, true)) {
                        $errors[$field][] = "The selected {$field} is invalid.";
                    }
                }

                if ($rule === 'confirmed') {
                    $confirmation = $this->data[$field . '_confirmation'] ?? null;

                    if ($value !== $confirmation) {
                        $errors[$field][] = "The {$field} confirmation does not match.";
                    }
                }

                if (str_starts_with($rule, 'unique:')) {
                    [, $params] = explode(':', $rule, 2);
                    $parts = array_map('trim', explode(',', $params));

                    $table = $parts[0] ?? '';
                    $column = $parts[1] ?? $field;
                    $ignoreId = $parts[2] ?? null;

                    if ($table !== '' && is_scalar($value)) {
                        $sql = "SELECT COUNT(*) AS count FROM {$table} WHERE {$column} = :value";
                        $bindings = ['value' => $value];

                        if ($ignoreId !== null && $ignoreId !== '') {
                            $sql .= ' AND id != :ignore_id';
                            $bindings['ignore_id'] = (int) $ignoreId;
                        }

                        $result = $this->database()->first($sql, $bindings);

                        if ((int) ($result['count'] ?? 0) > 0) {
                            $errors[$field][] = "The {$field} has already been taken.";
                        }
                    }
                }
            }

            if (!isset($errors[$field])) {
                $validated[$field] = $value;
            }
        }

        if ($errors !== []) {
            throw new ValidationException($errors);
        }

        return $validated;
    }

    private function normalizeRules(array|string $ruleSet): array
    {
        if (is_string($ruleSet)) {
            return array_values(array_filter(
                array_map('trim', explode('|', $ruleSet))
            ));
        }

        return array_values($ruleSet);
    }

    private function database(): Database
    {
        return $this->db ??= new Database();
    }
}
