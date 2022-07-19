import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { ManagePlaneComponent } from "./manage-plane.component";


describe('ManagePlaneComponent', () => {
  let spectator: Spectator<ManagePlaneComponent>;
  const createComponent = createComponentFactory({
    component: ManagePlaneComponent,
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
