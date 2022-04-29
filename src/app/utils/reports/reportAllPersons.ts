import { PdfMakeWrapper } from "pdfmake-wrapper";

export async function ReportGridPersons(content): Promise<PdfMakeWrapper> {
    const pdf = new PdfMakeWrapper();
    pdf.pageSize('A4')
    pdf.pageOrientation('landscape')
    pdf.pageMargins([62.5, 62.5, 62.5, 91])
    pdf.defaultStyle({
        fontSize: 12,
        
    })

    pdf.add(content)

    return pdf
}