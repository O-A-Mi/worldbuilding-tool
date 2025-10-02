import { useMemo, useState } from "react";
import styles from './styles.module.css';

function Button({ onClick, label, icon, disabled, size, type, loading, ...props }) {
  const stylesToApply = useMemo(() => {
    const classes = [styles.button];
    
    if (disabled) classes.push(styles.disabled);
    if (loading) classes.push(styles.loading);
    if (size) classes.push(styles[size]);
    
    const typeMap = {
      danger: styles.danger,
      primary: styles.primary,
      secondary: styles.secondary,
      outline: styles.outline,
      ghost: styles.ghost,
      iconOnly: styles.iconOnly
    };
    
    if (type && typeMap[type]) {
      classes.push(typeMap[type]);
    }
    
    return classes.join(' ');
  }, [disabled, loading, size, type]);

  return (
    <button 
      className={stylesToApply} 
      onClick={onClick} 
      disabled={disabled || loading} 
      {...props}
    >
      {icon && <i className={icon}></i>}
      {label && <span>{label}</span>}
    </button>
  );
}

export default Button;