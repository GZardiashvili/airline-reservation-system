import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { ManageFlightComponent } from "./manage-flight.component";

describe('ManageFlightComponent', () => {
  let spectator: Spectator<ManageFlightComponent>;
  const createComponent = createComponentFactory({
    component: ManageFlightComponent,
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
