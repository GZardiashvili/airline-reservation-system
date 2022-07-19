import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { ManageTicketComponent } from "./manage-ticket.component";


describe('ManageTicketComponent', () => {
  let spectator: Spectator<ManageTicketComponent>;
  const createComponent = createComponentFactory({
    component: ManageTicketComponent,
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
