async function createObjectPDFReport(infoColumns, dataInfo) {

    let data = JSON.parse(JSON.parse(dataInfo));

    let columns = [];
    let header = [];
    let columnsToDelete = ['is_public_server', 'sueldo'];
    let newData = [];

    data.forEach((element, index) => {

        if (element['active']) {
            delete element['active']
        }

        newData.push({
            "No.": index + 1,
            "NOMBRE": element.fullname || 'NO INGRESADO',
            "CÓDIGO": element.cui || 'NO INGRESADO',
            "PUESTO": element.job.name || 'NO INGRESADO',
            "ESPECIALIDAD": element.especiality.name || 'NO INGRESADO',
            "PARTIDA": element.partida || 'NO INGRESADO',
            "FECHA DE INGRESO": element.admission_date || 'NO INGRESADO',
            "DEPENDENCIA": element.work_dependency.name || 'NO INGRESADO',
            "REUBICACIÓN": element.reubication.name || 'NO INGRESADO',
            "RENGLÓN": element.renglon || 'NO INGRESADO',
            "TELÉFONO": element.phone || 'NO INGRESADO',
            "DPI": element.dpi || 'NO INGRESADO',
            "NIT": element.nit || 'NO INGRESADO',
            "FECHA DE NACIMIENTO": element.born_date || 'NO INGRESADO',
            "CORREO": element.email || 'NO INGRESADO',
            "ACTIVO": element.activo || 'NO INGRESADO',
            "is_public_server": element.is_public_server || 'NO INGRESADO',
            "sueldo": element.sueldo || 'NO INGRESADO',
            "uuid": element.uuid || '  NO INGRESADO',
        })
    })

    infoColumns.forEach((element, index) => {
        if (!element.check) {
            columnsToDelete.push(element.column)
        }
    });

    columnsToDelete.forEach(column => {
        newData.forEach(element => {
            delete element[column]
        })
    })

    newData.forEach((element, index) => {
        if (index == 0) {
            Object.keys(element).forEach(key => {
                header.push({ text: key, bold: true, fillColor: '#ABE6FA', alignment: 'center', })
            })
            columns.push(header)
        }

        columns.push(Object.values(element))
    });

    let table = {
        table: {
            body: columns
        }

    }
    return table
}

