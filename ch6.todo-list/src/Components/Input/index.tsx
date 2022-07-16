import React from 'react';
import Styled from 'styled-components';

const InputBox = Styled.input`
  font-size: 16px;
  padding: 10px 10px;
  border-radius: 8px;
  border: 1px solid #bdbdbd;
  outline: none;
`;

interface Props {
    readonly placeholder?: string;
    readonly value?: string;
    readonly onChange?: (text: string) => void;
}

export const Input = ({
    placeholder,
    value,
    onChange,
}: Props) => {
    return (
        <InputBox 
            placeholder={placeholder}
            value={value}
            onChange={(event) => {
                if (typeof onChange === 'function') {
                    onChange(event.target.value);
                }
            }}
        />
    );
};
