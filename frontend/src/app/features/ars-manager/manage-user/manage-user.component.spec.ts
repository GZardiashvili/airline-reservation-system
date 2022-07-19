import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { ManageUserComponent } from "./manage-user.component";

describe('ManageUserComponent', () => {
  let spectator: Spectator<ManageUserComponent>;
  const createComponent = createComponentFactory({
    component: ManageUserComponent,
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should create', () => {
      expect(spectator.component).toBeTruthy();
    }
  );
});
