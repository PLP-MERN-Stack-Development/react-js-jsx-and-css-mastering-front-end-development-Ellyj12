const baseCard = ' rounded-xl border-2 lg:w-1/2 w-full flex justify-center'

const Card = ({ className = '', children }) => {
    const combinedClasses = `${baseCard} ${className}`

    return (
        <div className={combinedClasses}>
            {children}
        </div>
    );

}

export default Card



