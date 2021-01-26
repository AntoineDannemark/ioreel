const extractSQLiteRowsData = (aRows, aFields) => {
    let data = [];
    if (aRows.length < 0 || !aFields.length) {
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

const extractNativevSQLiteData = (oResponse, aColumns) => {
    if (oResponse.rows && oResponse.rows.length) {
        return extractSQLiteRowsData(oResponse.rows, aColumns)
    } else {
        return oResponse;
    }
}

export const runQuery = async(query, params, type) => {
    /* Query types:
        /!\ we should restrict to the minimum 
        ("CREATE TABLE .." etc. should not be available to the "browser", but run from a file instead)

        SELECT 
        INSERT
        DELETE
        UPDATE

    */
    
    let result = {
        data: null,
        error: null,
    };

    try {
        // If the native query errors, we go to the catch 
        if (window.db) {
            const res = await window.db.executeSql(query, params);
            
            // Here we will have to switch on the query type..
            // shit code all over the place loool :-(
            result.data = res.rows.length ? extractSQLiteRowsData(res.rows, ["id", "firstname", "lastname"]) : res;
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