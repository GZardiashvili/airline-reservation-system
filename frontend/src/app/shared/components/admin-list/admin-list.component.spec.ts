import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { AdminListComponent } from "./admin-list.component";

describe('AdminListComponent', function () {
  let spectator: Spectator<AdminListComponent>;
  const createComponent = createComponentFactory({
    component: AdminListComponent,
    detectChanges: false,
    imports: [],
    providers: [],
  })

  beforeEach(() => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
