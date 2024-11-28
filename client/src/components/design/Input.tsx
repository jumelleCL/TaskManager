import { ComponentProps, forwardRef, useId } from "react";
import { FieldError } from "react-hook-form";
import styled from "styled-components";

type Props = ComponentProps<"input"> & {
  type?: string;
  className?: string;
  label?: string;
  validate?: boolean;
  placeholder?: string;
  error?: FieldError | undefined;
};

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { type, className, label, placeholder, validate, error, ...rest }: Props,
  ref
) {
  const id = useId();
  return (
    <div className={`relative ${(validate ? 'mb-5' : 'm-0')}`}>
      <InputStyled className={`${className} rounded relative text-slate-700`}>
        <input ref={ref} id={id} type={type} required {...rest} />
        {(label || placeholder) && (
          <label htmlFor={id} className="label-name">
            <span className="content-name">{label || placeholder}</span>
          </label>
        )}
      </InputStyled>
      {error && (
        <span className="absolute text-red-700 text-sm top-full left-0 w-full">
          {error.message}
        </span>
      )}
    </div>
  );
});

export default Input;

//* Estilos
const InputStyled = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;

  input {
    width: 100%;
    height: 100%;
    font-size: 0.8rem;
    padding: 1rem 0.6rem;
    color: #162025;
    border: none;
    outline: none;
    background-color: #f1f5f9;
  }

  label {
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0;
    left: 0;
    pointer-events: none;
    border-bottom: 1px solid transparent;
    transition: all 0.3s ease;

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      border-bottom: 3px solid black;
      bottom: -1px;
      left: 0;
      transform: translateX(-100%);
      transition: all 0.3s ease;
    }
  }

  .content-name {
    position: absolute;
    bottom: 5px;
    left: 0.5rem;
    transition: all 0.3s ease;
  }

  input:focus + .label-name .content-name,
  input:valid + .label-name .content-name {
    transform: translateY(-120%);
    font-size: 0.8rem;
    color: #868686;
  }

  input:focus + .label-name::after,
  input:valid + .label-name::after {
    transform: translateX(0%);
  }
`;
