import styles from './styles.module.css'

function Body({ children }){
  return(
    <>
      <div className={styles.bodyEfeitos}>
        <div className={styles.bodyEfeitos1}></div>
        <div className={styles.bodyEfeitos2}></div>
        <div className={styles.bodyEfeitos3}></div>
      </div>
      <div className={styles.bodyContainer}>
        {children}
      </div>
    </>
  )
}

export default Body;
