import {Component, Input, Output, OnChanges, ViewEncapsulation, SimpleChanges, EventEmitter} from '@angular/core';

import {Family} from '../family';
import {FamilyMember} from '../family-member';

@Component
({
  selector: 'cnstll-family-member-menu-item',
  templateUrl: 'family-member-menu-item.component.html',
  styleUrls: ['family-member-menu-item.component.scss']
})
export class FamilyMemberMenuItemComponent implements OnChanges {

  @Input()
  public family: Family;

  @Input()
  public familyMember: FamilyMember;

  @Input()
  public loading: boolean;

  @Input()
  public hasConsents: string; // "unknown", "true" or "false"

  @Output()
  public selectFamilyAndFamilyMember: EventEmitter<any> = new EventEmitter<any>();

  public constructor() {
    this.loading = false;
  }

  public ngOnChanges(changes: SimpleChanges): void {
  }

  public doSelectFamilyAndFamilyMember(): void {
    this.selectFamilyAndFamilyMember.emit({
      family: this.family,
      familyMember: this.familyMember
    });
  }
}
