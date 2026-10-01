import { ThemeToggle } from "@/components/ThemeToggle";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const setTheme = jest.fn();
let resolvedTheme: string | undefined = "light";

// Only the hook is faked. The provider needs window.matchMedia, which jsdom does not
// implement, and it would add nothing here: the toggle's whole behaviour is this hook.
jest.mock("next-themes", () => ({ useTheme: () => ({ resolvedTheme, setTheme }) }));

describe("ThemeToggle", () => {
  beforeEach(() => {
    setTheme.mockClear();
    resolvedTheme = "light";
  });

  it("should name itself, since it only shows an icon", () => {
    render(<ThemeToggle label="Cambiar de tema" />);

    expect(screen.getByRole("button", { name: "Cambiar de tema" })).toBeInTheDocument();
  });

  it("should go to dark when it is light", async () => {
    render(<ThemeToggle label="Cambiar de tema" />);
    await userEvent.click(screen.getByRole("button"));

    expect(setTheme).toHaveBeenCalledWith("dark");
  });

  it("should go back to light when it is dark", async () => {
    resolvedTheme = "dark";
    render(<ThemeToggle label="Cambiar de tema" />);
    await userEvent.click(screen.getByRole("button"));

    expect(setTheme).toHaveBeenCalledWith("light");
  });

  it("should render both icons and let CSS pick, so server and client agree on the markup", () => {
    const { container } = render(<ThemeToggle label="Cambiar de tema" />);

    expect(container.querySelectorAll("svg")).toHaveLength(2);
  });
});
