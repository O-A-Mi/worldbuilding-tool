import React, { useMemo, useRef, useState, useEffect } from "react";
import styles from './styles.module.css'

const defaultIcons = {
  text: "",
  email: "fa-light fa-envelope",
  password: "fa-light fa-lock",
  number: "fa-light fa-hashtag",
  tel: "fa-light fa-phone",
  date: "fa-light fa-calendar-days",
  time: "fa-light fa-clock",
  search: "fa-light fa-search",
  select: "fa-light fa-chevron-down",
};

function Input({
  label,
  type = "text",
  value,
  onChange,
  inputRef,
  placeholder,
  required,
  disabled,
  readOnly,
  icon,
  iconStyle = {},
  upperCase,
  lowerCase,
  inputStyle = {},
  className,
  identifier,
  onBlur,
  options = [],
  ...props
}) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const getIcon = () => icon !== undefined ? icon : defaultIcons[type] || defaultIcons.text;

  const inputStyles = useMemo(() => ({
    ...(upperCase && { textTransform: 'uppercase' }),
    ...(lowerCase && { textTransform: 'lowercase' }),
    ...inputStyle
  }), [upperCase, lowerCase, inputStyle]);

  const commonProps = {
    value,
    onChange,
    placeholder,
    required,
    disabled,
    readOnly,
    id: identifier,
    ref: inputRef,
    onBlur,
    style: inputStyles,
    className: className || "inputPadrao",
    ...props
  };

    const CustomSelect = () => {
        const [isOpen, setIsOpen] = useState(false);
        const selectRef = useRef(null);
        const selectedOption = options.find(option => option.value === value);

        const handleSelect = (optionValue) => {
            if (onChange) {
                onChange({ target: { id: identifier, value: optionValue } });
            }
            setIsOpen(false);
        };

        useEffect(() => {
            const handleClickOutside = (event) => {
                if (selectRef.current && !selectRef.current.contains(event.target)) {
                    setIsOpen(false);
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, []);
        
        const containerClasses = `${styles.selectContainer} ${disabled ? styles.disabled : ''} ${isOpen ? styles.open : ''}`;
        const displayClasses = `${styles.inputPadrao} ${styles.selectDisplay}`;
        
        return (
            <div className={containerClasses} ref={selectRef} data-disabled={disabled}>
                <div className={displayClasses} onClick={() => !disabled && setIsOpen(!isOpen)}>
                    <span>{selectedOption?.label || placeholder || 'Selecione...'}</span>
                    <i className={`${defaultIcons.select} ${styles.selectChevron}`} />
                </div>
                {isOpen && (
                    <div className={styles.selectOptions}>
                        {options.map(option => (
                            <div
                                key={option.value}
                                className={`${styles.selectOption} ${option.value === value ? styles.selected : ''}`}
                                onClick={() => handleSelect(option.value)}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

  const renderInput = () => {
    switch (type) {
      case "password":
        return (
          <>
            <input 
              {...commonProps} 
              type={isPasswordVisible ? "text" : "password"} 
            />
            <div className={styles.iconsContainer}>
              <i 
                className={`fa-light fa-${isPasswordVisible ? "eye-slash" : "eye"} ${styles.eyeIcon}`}
                onClick={() => setPasswordVisible(!isPasswordVisible)}
              />
              {getIcon() && <i className={getIcon()} style={iconStyle} />}
            </div>
          </>
        );
      case "textarea":
        return <textarea {...commonProps} />;
      case "select":
          return <CustomSelect />;
      default:
        return (
          <>
            <input {...commonProps} type={type} />
            {icon !== false && getIcon() && <i className={getIcon()} style={iconStyle} />}
          </>
        );
    }
  };

  return (
    <>
      <div className={styles.inputField}>
        {label && (
          <label className={styles.inputLabel}>
            {label} {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={styles.inputPadraoContent}>
          <div className={styles.inputPadraoField}>
            {renderInput()}
          </div>
        </div>
      </div>
    </>
  );
}

const useConst = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef('');
  const handleChange = (e) => setValue(e.target.value);
  return [value, handleChange, inputRef];
}

export { useConst, Input };

