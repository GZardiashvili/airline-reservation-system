import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { FlightComponent } from "./flight.component";

describe('FlightComponent', () => {
  let spectator: Spectator<FlightComponent>;
  const createComponent = createComponentFactory({
    component: FlightComponent,
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
