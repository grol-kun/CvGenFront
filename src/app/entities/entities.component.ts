import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil, debounceTime } from 'rxjs';
import { ABILITIES } from '../shared/models/constants/abilities';
import { Ability } from '../shared/models/interfaces/ability';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntitiesComponent implements OnInit, OnDestroy {
  searchControl = new FormControl<string>('');
  searchAbility = '';
  isTableVisible = false;
  abilities: object[];
  abilityType!: string;
  private destroy$ = new Subject<void>();
  

  constructor(private cdr: ChangeDetectorRef) {
    this.abilities = ABILITIES
  }

  ngOnInit(): void {
    this.initSearch();
  }

  initSearch() {
    this.searchControl.valueChanges.pipe(debounceTime(200), takeUntil(this.destroy$)).subscribe((data) => {
      this.searchAbility = data ?? '';
      this.cdr.detectChanges();
    });
  }

  initTable(abilityType: string) {
    this.abilityType = abilityType.toLowerCase();
    this.isTableVisible = true;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  trackByFn(index: number, ability: Ability) {
    return ability.id;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
