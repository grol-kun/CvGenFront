import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { infoSelector } from '../../core/store/selectors/auth.selector';
import { MyInfo } from 'src/app/shared/models/interfaces/my-info';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
})
export class DropdownMenuComponent implements OnInit {
  isVisible = false;
  info$!: Observable<MyInfo | null>;

  constructor(private authService: AuthService, private store: Store) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }

  showModal(): void {
    this.isVisible = true;
    this.info$ = this.store.select(infoSelector);
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
