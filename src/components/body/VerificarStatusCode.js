export function StatusCode(value) {
    if (value != 200 && value != 201 && value != 204) {
        window.alert(`Não foi possivel concluír a operação. Por favor, tente novamente mais tarde! \n Cod. ${value}`);
        return false;
    }
    window.alert(`Operação concluída com sucesso! \n Cod. ${value}`);
    return true;
}

export function ValidarCompoDate(value) {
    value = value.replace(/\D/g, "")
    value = value.replace(/(\d{2})?(\d{2})?(\d{4})/, "$2/$1/$3")
    let date = new Date(Date.parse(value));
    if (date instanceof Date && !isNaN(date)) {
        return true;
    }
    else {
        window.alert(`O campo data é invalido!`);
    }
    return false;
}