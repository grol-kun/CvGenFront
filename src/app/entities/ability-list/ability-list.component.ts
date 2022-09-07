import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil, Subject, BehaviorSubject, switchMap } from 'rxjs';
import { Ability } from 'src/app/shared/models/interfaces/ability';
import { Response } from 'src/app/shared/models/interfaces/response';
import { AbilityService } from 'src/app/shared/services/ability.service';

@Component({
  selector: 'app-ability-list',
  templateUrl: './ability-list.component.html',
  styleUrls: ['./ability-list.component.scss'],
})
export class AbilityListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() abilityType!: string;
  emitSubject = new BehaviorSubject(null);
  searchControl = new FormControl<string>('');
  searchAbility = '';
  abilitiesList$ = new BehaviorSubject<Ability[]>([]);
  isModalVisible = false;
  private destroy$ = new Subject<void>();

  constructor(
    private abilityService: AbilityService,
    private message: NzMessageService,
    private cdr: ChangeDetectorRef
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
        takeUntil(this.destroy$),
        switchMap(() => this.getAbilities())
      )
      .subscribe((data) => {
        this.abilitiesList$.next(data.data);
        this.message.create('success', `Item has just been deleted!`);
      });
  }

  ngOnChanges() {
    this.emitSubject
      .asObservable()
      .pipe(switchMap(() => this.getAbilities()))
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.abilitiesList$.next(data.data);
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
    this.emitCalled();
  }

  emitCalled() {
    this.emitSubject.next(null);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
