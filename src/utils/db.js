const extractSQLiteRowsData = (aRows, aFields) => {
    let data = [];
    
    if (!aRows.length || !aFields.length) {
        return data;
    } else {
        for (let i = 0; i < aRows.length; i++) {
            let row = {};
            
            for (let j = 0; j < aFields.length; j++) {
                row[aFields[j]] = aRows.item(i)[aFields[j]];
            }           
            data.push(row);
        }
    }    
    return data;
}

export const runQuery = async(query, params, type) => {
    let result = {
        data: null,
        error: null,
    };

    try {
        // If the native query errors, we go to the catch 
        if (window.db) {
            const res = await window.db.executeSql(query, params);

            result.data = res.rows ? extractSQLiteRowsData(res.rows, ["id", "firstname", "lastname"]) : res;
        // If the electron query errors, it will populate res.error
        } else if (window.ipc) {
            result = await window.ipc.invoke("query", {
                type,
                query, 
                params,
            });
        }
    } catch (err) {
        result.error = err;
    }    
    return result;
}