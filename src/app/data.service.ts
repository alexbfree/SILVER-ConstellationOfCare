import { Injectable }               from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Family }        from './family';
import { FamilyMember }  from './family-member';

import { MIGInformation } from './mig-information';
import { MIGProblem }     from './mig-problem';
import { MIGEvent }       from './mig-event';

@Injectable()
export class DataService
{
    private families:      Family[];
    private familyMembers: FamilyMember[];

    constructor(private httpClient: HttpClient)
    {
        this.familyMembers  = [];

        const familyMember00: FamilyMember = new FamilyMember('p00', 'Amy', 'Smith', '20/12/70', 'female', '4853379371');
        const familyMember01: FamilyMember = new FamilyMember('p01', 'Bill', 'Jones', '12/01/71', 'male', '6424561811');
        const familyMember02: FamilyMember = new FamilyMember('p02', 'Clare', 'Smith', '13/03/95', 'female', '9051292074');
        const familyMember03: FamilyMember = new FamilyMember('p03', 'David', 'Jones', '07/07/97', 'male', '5700200716');

        const family0: Family = new Family('f00', [ familyMember00, familyMember01, familyMember02, familyMember03 ]);

        const familyMember10: FamilyMember = new FamilyMember('p04', 'Amy', 'Brown', '20/12/70', 'female', '8225676149');
        const familyMember11: FamilyMember = new FamilyMember('p05', 'Bill', 'Lee', '12/01/71', 'male', '9620344472');
        const familyMember12: FamilyMember = new FamilyMember('p06', 'Clare', 'Brown', '13/03/95', 'female', '4160066348');
        const familyMember13: FamilyMember = new FamilyMember('p07', 'David', 'Brown', '07/07/97', 'male', '5894678846');

        const family1: Family = new Family('f01', [ familyMember10, familyMember11, familyMember12, familyMember13 ]);

        const familyMember20: FamilyMember = new FamilyMember('p08', 'Amy', 'James', '20/12/70', 'female', '8880028669');
        const familyMember21: FamilyMember = new FamilyMember('p09', 'Bill', 'James', '12/01/71', 'male', '6068998983');
        const familyMember22: FamilyMember = new FamilyMember('p10', 'Clare', 'James', '13/03/95', 'female', '4198838577');

        const family2: Family = new Family('f02', [ familyMember20, familyMember21, familyMember22 ]);

        this.families = [ family0, family1, family2 ];
    }

    public loadFamilies(): Promise<Family[]>
    {
        return new Promise(resolve => setTimeout(() => resolve(this.families), 4000));
    }

    public loadFamily(familyId: string): Promise<Family>
    {
        let family: Family = null;

        for (let current of this.families)
            if (familyId === current.id)
                family = current;

        return new Promise(resolve => setTimeout(() => resolve(family), 1000));
    }

    public loadMIGInformation(nhsNumber: string): Promise<MIGInformation>
    {
        return this.httpClient.get("http://dataservice-mig.silver.arjuna.com/data/ws/mig/problems?nhs_number=" + nhsNumber)
                   .toPromise()
                   .then((response: any) => Promise.resolve(this.loadMIGInformationSuccessHandler(nhsNumber, response)))
                   .catch((error) => Promise.resolve(this.loadMIGInformationErrorHandler(nhsNumber, error)));
    }

    private loadMIGInformationSuccessHandler(nhsNumber: string, body: any): MIGInformation
    {
        console.log('Body = ' + JSON.stringify(body));

        let status: string = body.status;

        let migProblems: MIGProblem[] = [];
        if (body.healthDomain && body.healthDomain.problems)
            for (let problem of body.healthDomain.problems)
                migProblems.push(new MIGProblem(problem.id, problem.status, problem.significance, problem.expectedDuration, problem.endTime));

        let migEvents: MIGEvent[] = [];
        if (body.healthDomain && body.healthDomain.events)
            for (let event of body.healthDomain.events)
                migEvents.push(new MIGEvent(event.id, event.patient, event.eventType, event.effectiveTime, event.availabilityTimeStamp, event.authorisingUserInRole, event.enteredByUserInRole, event.code, event.displayTerm, event.organisation, event.observation));

        return new MIGInformation(nhsNumber, status, [], [], migProblems, migEvents);
    }

    private loadMIGInformationErrorHandler(nhsNumber: string, error: any): MIGInformation
    {
        console.log('MIG-Information Error Handler: ' + JSON.stringify(error));

        return new MIGInformation(nhsNumber, 'Failed', [], [], [], []);
    }
}
