import { Component, Input } from '@angular/core';

import { MIGInformation } from '../mig-information';

@Component
({
    selector:    'cnstll-mig-admindomain',
    templateUrl: './mig-admindomain.component.html',
    styleUrls:   ['./mig-admindomain.component.scss']
})
export class MIGAdminDomainComponent
{
    @Input()
    public information: MIGInformation;
    @Input()
    public format: string;

    public constructor()
    {
    }
}