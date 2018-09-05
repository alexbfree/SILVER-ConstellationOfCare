import { ESPFHIREntry } from './espfhir-entry';

export class ESPFHIRInformation
{
    public nhsNumber: string;
    public status:    string;

    public text: string;

    public constructor(nhsNumber: string, status: string, text: string)
    {
        this.nhsNumber = nhsNumber;
        this.status    = status;

        this.text = text;
    }
}
