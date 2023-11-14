const Validation = {
    date(number) {
        return (isNaN(number) || 1 <= number || 31 >= number);
    }
}

export default Validation;