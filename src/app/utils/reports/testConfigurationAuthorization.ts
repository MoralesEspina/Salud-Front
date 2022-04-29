import { Img, PdfMakeWrapper } from "pdfmake-wrapper";
import { AuthorizationConfigurationFile } from "src/app/models/authorizationConfiguration";

export async function TestConfigurationAuthorizationFile(configuration: AuthorizationConfigurationFile): Promise<PdfMakeWrapper> {
    const pdf = new PdfMakeWrapper();

    pdf.pageSize('A4');
    pdf.defaultStyle({
        fontSize: 13
    })

    pdf.background(await new Img(configuration.fileName).alignment(configuration.align).width(`${configuration.width}`).height(`${configuration.height}`).build())
    return pdf;
}