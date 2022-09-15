import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil, Subject, BehaviorSubject, switchMap } from 'rxjs';
import { Ability } from 'src/app/shared/models/interfaces/ability';
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
  abilitiesListSubject = new BehaviorSubject(null);
  searchControl = new FormControl<string>('');
  searchAbility = '';
  abilitiesList$ = new BehaviorSubject<Ability[]>([]);
  isAddModalVisible = false;
  isEditModalVisible = false;
  abilityId = 0;
  abilityData = '';
  private destroy$ = new Subject<void>();

  constructor(
    private abilityService: AbilityService,
    private message: NzMessageService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.initSearch();
  }

  initSearch() {
    this.searchControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.searchAbility = data ?? '';
    });
  }

  getAbilities() {
    return this.abilityService.getFullList<Response<Ability>>(this.abilityType);
  }

  deleteItem(id: number) {
    this.abilityService
      .deleteItemById(this.abilityType, id)
      .pipe(
        switchMap(() => this.getAbilities()),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.abilitiesList$.next(data.data);
        this.message.create('success', this.translateService.instant('message_box.success_delete'));
      });
  }

  ngOnChanges() {
    this.abilitiesListSubject
      .asObservable()
      .pipe(
        switchMap(() => this.getAbilities()),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.abilitiesList$.next(data.data);
      });
  }

  trackByFn(index: number, ability: Ability) {
    return ability.id;
  }

  showAddModal() {
    this.isAddModalVisible = true;
  }

  showEditModal(id: number, data: string) {
    this.abilityId = id;
    this.abilityData = data;
    this.isEditModalVisible = true;
  }

  onHideModal() {
    this.isAddModalVisible = false;
    this.isEditModalVisible = false;
    this.forceAbilitiesListSubject();
  }

  forceAbilitiesListSubject() {
    this.abilitiesListSubject.next(null);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
