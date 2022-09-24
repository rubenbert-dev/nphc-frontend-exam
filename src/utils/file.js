import Papa from "papaparse";

export const parseToJson = (file) => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            complete (results, file) {
                resolve(results.data)
            },
            error (err, file) {
                reject(err)
            }
        })
    })
}