import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, map, takeUntil, Subject, debounceTime } from 'rxjs';
import { ABILITY_COLUMNS } from 'src/app/shared/models/constants/ability-columns';
import { Ability } from 'src/app/shared/models/interfaces/ability';
import { ColumnItem } from 'src/app/shared/models/interfaces/column-item';
import { Response } from 'src/app/shared/models/interfaces/response';
import { AbilityService } from 'src/app/shared/services/ability.service';


@Component({
  selector: 'app-ability-list',
  templateUrl: './ability-list.component.html',
  styleUrls: ['./ability-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbilityListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() abilityType!: string;
  searchControl = new FormControl<string>('');
  searchAbility = '';
  abilitiesList$!: Observable<Ability[]>;
  isModalVisible = false;
  private destroy$ = new Subject<void>();

  constructor(
    private abilityService: AbilityService,
    private message: NzMessageService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.getAbilitiesList();
    this.initSearch();
  }

  initSearch() {
    this.searchControl.valueChanges.pipe(debounceTime(200), takeUntil(this.destroy$)).subscribe((data) => {
      this.searchAbility = data ?? '';
      this.cdr.detectChanges();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getAbilitiesList();
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  getAbilitiesList() {
    this.abilitiesList$ = this.abilityService.getFullList<Response<Ability>>(this.abilityType).pipe(map((data) => data.data));
  }

  deleteItem(id: number) {
    this.abilityService
      .deleteItemById(this.abilityType!, id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.message.create('success', `Item has just been deleted!`);
        this.getAbilitiesList();
        this.cdr.detectChanges();
      });
  }

  trackByFn(index: number, ability: Ability) {
    return ability.id;
  }

  showModal() {
    this.isModalVisible = true;
  }

  onHideModal() {
    this.isModalVisible = false;
    this.cdr.detectChanges();
  }

  onAbilityAdded(ability: Ability) {
    this.isModalVisible = false;
  }

  onClick(event: Event) {
    event.stopPropagation();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
