import { useEffect, useState, type ChangeEvent, type FocusEvent, type TextareaHTMLAttributes } from 'react';
import { useFela } from 'react-fela';

import { InputSizeEnum } from '../../constants';

import {
    errorStyles,
    getContainerStyles,
    labelFocusedStyles,
    labelStyles,
    textareaStyles,
    textareaWrapperStyles,
} from './Textarea.styles';

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'placeholder'> {
    label: string;
    error?: string;
    size?: InputSizeEnum;
}

/**
 * Textarea component with floating label and error message support
 *
 * @param label - Label that floats when focused or has value
 * @param error - Optional error message to display below the textarea
 * @param onFocus - Optional focus event handler
 * @param onBlur - Optional blur event handler
 * @param value - Controlled textarea value
 * @param onChange - Change event handler
 * @param size - Textarea size variant
 * @param defaultValue - Uncontrolled textarea default value
 * @param props - Additional HTML textarea attributes
 * @returns Textarea element with label and optional error message
 */
export function Textarea({
    label,
    error,
    onFocus,
    onBlur,
    value,
    onChange,
    size,
    defaultValue,
    ...props
}: TextareaProps) {
    const { css } = useFela();
    const [isFocused, setIsFocused] = useState(false);
    const initialValue = value ?? defaultValue ?? '';
    const [currentValue, setCurrentValue] = useState<string>(String(initialValue));

    useEffect(() => {
        if (value !== undefined) {
            setCurrentValue(String(value));
        }
    }, [value]);
    
    const hasValue = currentValue.length > 0;
    const shouldFloatLabel = isFocused || hasValue;

    const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(true);
        onFocus?.(e);
    };

    const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(false);
        onBlur?.(e);
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentValue(e.target.value);
        onChange?.(e);
    };

    const errorId = error && props.id ? `${props.id}-error` : undefined;

    return (
        <div className={css(getContainerStyles(size))}>
            <div className={css(textareaWrapperStyles)}>
                <textarea
                    {...props}
                    value={value}
                    defaultValue={defaultValue}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={css(textareaStyles)}
                    placeholder=""
                    autoComplete="off"
                    aria-invalid={error ? true : undefined}
                    aria-describedby={errorId}
                />
                <label
                    htmlFor={props.id}
                    className={css([labelStyles, ...(shouldFloatLabel ? [labelFocusedStyles] : [])])}
                >
                    {label}
                </label>
            </div>
            {error && (
                <div id={errorId} className={css(errorStyles)} role="alert">
                    {error}
                </div>
            )}
        </div>
    );
}

