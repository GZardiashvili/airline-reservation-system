import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { ArsManagerComponent } from "./ars-manager.component";


describe('ArsManagerComponent', () => {
  let spectator: Spectator<ArsManagerComponent>;
  const createComponent = createComponentFactory({
    component: ArsManagerComponent,
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
