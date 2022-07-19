import { createComponentFactory, mockProvider, Spectator } from "@ngneat/spectator";
import { DetailsComponent } from "./details.component";
import { FormBuilder } from "@angular/forms";

describe('detailsComponent', () => {
  let spectator: Spectator<DetailsComponent>;
  const createComponent = createComponentFactory({
    component: DetailsComponent,
    detectChanges: false,
    imports: [],
    providers: [
      mockProvider(FormBuilder)
    ]
  })

  beforeEach(() => {
    spectator = createComponent();
    spectator.detectChanges();
  })
  it('should create', function () {
    expect(spectator.component).toBeTruthy();
  });
});
