import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { BookFlightComponent } from "./book-flight.component";

describe('flightComponent', () => {
  let spectator: Spectator<BookFlightComponent>;
  const createComponent = createComponentFactory({
    component: BookFlightComponent,
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
