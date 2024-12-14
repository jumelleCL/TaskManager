import { ComponentProps, forwardRef, useId } from "react";
import { FieldError } from "react-hook-form";
import styled from "styled-components";

type Props = ComponentProps<"textarea"> & {
    type?: string;
    className?: string;
    labelClass?: string;
    label?: string;
    validate?: boolean;
    placeholder?: string;
    error?: FieldError | undefined;
};

const BigInput = forwardRef<HTMLTextAreaElement, Props>(function BigInput(
  { className, labelClass, label, placeholder, validate, error, ...rest }: Props,
  ref
) {
  const id = useId();
  return (
    <div className={`${className} relative ${(validate ? 'mb-5' : 'm-0')}`}>
      <InputStyled className="relative text-slate-700">
        <textarea
          ref={ref}
          id={id}
          required
          {...rest}
          className={`resize-none ${className}`}
        />
        {(label || placeholder) && (
          <label htmlFor={id} className={`label-name ${labelClass}`}>
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

export default BigInput;

//* Estilos
const InputStyled = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;

  textarea {
    width: 100%;
    height: 7rem; // Altura inicial de 3 líneas de texto.
    font-size: 0.8rem;
    padding: 1rem 0.6rem;
    color: #162025;
    border: none;
    outline: none;
    background-color: #f1f5f9;
    resize: none; // Desactiva el redimensionamiento.
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
    bottom: 75px;
    left: 0.5rem;
    transition: all 0.3s ease;
  }

  textarea:focus + .label-name .content-name,
  textarea:valid + .label-name .content-name {
    transform: translateY(-80%);
    font-size: 0.8rem;
    color: #868686;
  }

  textarea:focus + .label-name::after,
  textarea:valid + .label-name::after {
    transform: translateX(0%);
  }
`;
