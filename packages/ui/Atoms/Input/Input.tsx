import React, { useEffect, useState, type FocusEvent, type InputHTMLAttributes } from 'react';
import { useFela } from 'react-fela';
import { InputSizeEnum } from '../../constants';

import {
    errorStyles,
    getContainerStyles,
    inputStyles,
    inputWrapperPlaceholderStyles,
    inputWrapperStyles,
    labelFocusedStyles,
    labelStyles,
} from './Input.styles';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder' | 'size'> {
    label?: string;
    error?: string;
    placeholder?: string;
    size?: InputSizeEnum;
}

export function Input({ label, error, onFocus, onBlur, value, onChange, placeholder, size, defaultValue, ...props }: InputProps) {
    const { css } = useFela();
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const initialValue = value ?? defaultValue ?? '';
    const [currentValue, setCurrentValue] = useState<string>(String(initialValue));
    
    useEffect(() => {
        if (value !== undefined) {
            setCurrentValue(String(value));
        }
    }, [value]);
    
    const usePlaceholder = !label;
    const hasValue = currentValue.length > 0;
    const shouldFloatLabel = !usePlaceholder && (isFocused || hasValue);

    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onFocus?.(e);
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentValue(e.target.value);
        onChange?.(e);
    };

    const errorId = error && props.id ? `${props.id}-error` : undefined;

    return (
        <div className={css(getContainerStyles(size))}>
            <div className={css(usePlaceholder ? inputWrapperPlaceholderStyles : inputWrapperStyles)}>
                <input
                    {...props}
                    value={value}
                    defaultValue={defaultValue}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={css(inputStyles)}
                    placeholder={usePlaceholder ? placeholder : ' '}
                    autoComplete="off"
                    aria-invalid={error ? true : undefined}
                    aria-describedby={errorId}
                />
                {!usePlaceholder && (
                    <label
                        htmlFor={props.id}
                        className={css([labelStyles, ...(shouldFloatLabel ? [labelFocusedStyles] : [])])}
                    >
                        {label}
                    </label>
                )}
            </div>
            {error && (
                <div id={errorId} className={css(errorStyles)} role="alert">
                    {error}
                </div>
            )}
        </div>
    );
}

