export class FormatsDate {
    /**
     * 01/01/2021 --> {day:1, month:enero, year:2021}
     */
    public static DateToWordObject(date: string): Object {
        var emitteddate = new Date(date);
        var emitday = emitteddate.getDate();
        var emitmonth = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(new Date(emitteddate));
        var emitanio = emitteddate.getFullYear();
        return {
            day: emitday,
            month: emitmonth,
            year: emitanio,
        }
    }
}
