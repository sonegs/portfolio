import { SmoothScroll } from "@/components/SmoothScroll";
import { render } from "@testing-library/react";

let scrollTo: jest.Mock;

function stubReducedMotion(reduce: boolean) {
  window.matchMedia = jest.fn().mockReturnValue({ matches: reduce });
}

function wheel(deltaY: number, init: WheelEventInit = {}) {
  const event = new WheelEvent("wheel", { deltaY, cancelable: true, ...init });
  window.dispatchEvent(event);

  return event;
}

describe("SmoothScroll", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    stubReducedMotion(false);
    scrollTo = jest.fn();
    window.scrollTo = scrollTo;
    Object.defineProperty(document.documentElement, "scrollHeight", { value: 5000, configurable: true });
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("should take the wheel over so it can glide instead of letting the browser jump", () => {
    render(<SmoothScroll />);

    expect(wheel(100).defaultPrevented).toBe(true);
  });

  it("should cover only part of the distance on the first frame, which is what makes it brake slowly", () => {
    render(<SmoothScroll />);

    wheel(100);
    jest.advanceTimersByTime(16);

    const [, y] = scrollTo.mock.calls.at(-1) as [number, number];
    expect(y).toBeGreaterThan(0);
    expect(y).toBeLessThan(100);
  });

  it("should arrive at the full distance once the glide has settled", () => {
    render(<SmoothScroll />);

    wheel(100);
    jest.advanceTimersByTime(2000);

    expect(scrollTo).toHaveBeenLastCalledWith(0, 100);
  });

  it("should read a notch reported in lines as a sensible number of pixels, not as three", () => {
    render(<SmoothScroll />);

    wheel(3, { deltaMode: WheelEvent.DOM_DELTA_LINE });
    jest.advanceTimersByTime(2000);

    expect(scrollTo).toHaveBeenLastCalledWith(0, 48);
  });

  it("should leave the wheel alone when the system asks for reduced motion", () => {
    stubReducedMotion(true);
    render(<SmoothScroll />);

    expect(wheel(100).defaultPrevented).toBe(false);
  });

  it("should leave a ctrl-wheel to the browser, since that is a zoom and not a scroll", () => {
    render(<SmoothScroll />);

    expect(wheel(100, { ctrlKey: true }).defaultPrevented).toBe(false);
  });

  it("should stop listening once it is unmounted", () => {
    const { unmount } = render(<SmoothScroll />);
    unmount();

    expect(wheel(100).defaultPrevented).toBe(false);
  });
});
