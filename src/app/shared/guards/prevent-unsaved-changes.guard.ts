import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { UserPage } from '../../pages/users/user.page';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<UserPage> {
  canDeactivate(component: UserPage) {
    if (component.editForm.dirty) {
      return confirm(
        'Are you sure you want to continue?  Any unsaved changes will be lost'
      );
    }
    return true;
  }
}
