import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ABILITY_TYPES } from '../shared/models/constants/abilities';
import { Ability } from '../shared/models/interfaces/ability';
import { AbilityType } from '../shared/models/interfaces/ability-type';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntitiesComponent implements OnInit, OnDestroy {
  searchControl = new FormControl<string>('');
  searchAbility = '';
  abilities: AbilityType[] = ABILITY_TYPES;
  abilityType!: string;
  isTableVisible = false;
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.initSearch();
  }

  initSearch() {
    this.searchControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.searchAbility = data ?? '';
    });
  }

  initTable(abilityType: string) {
    this.abilityType = abilityType.substring('entities.labels.'.length).toLowerCase();
    this.isTableVisible = true;
  }

  trackByFn(index: number, ability: Ability) {
    return ability.id;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
