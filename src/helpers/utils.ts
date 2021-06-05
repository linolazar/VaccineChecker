export const getDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    return  dd + '-' + mm + '-' + yyyy;
};

export const RemoveDuplicateString = (item: string[]) => {
    return item.filter(function(x: string, pos: number) {
        return item.indexOf(x) === pos;
    })
}

export const RemoveDuplicateNumbers = (item: number[]) => {
    return item.filter(function(x: number, pos: number) {
        return item.indexOf(x) === pos;
    })
}
