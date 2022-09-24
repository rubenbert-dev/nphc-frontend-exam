export default function generateEmployeeId(id) {
    let idParam = id;
    if (!id) {
        idParam = 1;
    }
    const idLn = `${idParam}`.toString().length;
    const idPref = [...Array(5 - idLn)].map(e => "0").join("");

    return `e${idPref}${idParam}`;
}