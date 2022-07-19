import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { BookedComponent } from "./booked.component";

describe('BookedComponent', () => {
  let spectator: Spectator<BookedComponent>;
  const createComponent = createComponentFactory({
    component: BookedComponent,
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
