import { act, renderHook } from "react-hooks-testing-library";
import { useNavigation } from "./navigation";

describe("navigation", () => {
    it("should set activeArea", () => {
        const { result } = renderHook(() => useNavigation());
        act(() => result.current.setActiveArea("settings"));
        expect(result.current.activeArea).toBe("settings");
    });

    it("should set activeHomePage", () => {
        const { result } = renderHook(() => useNavigation());
        act(() => result.current.setActiveHomePage("foo" as any));
        expect(result.current.activeHomePage).toBe("foo");
    });

    it("should set activeRecipesPage", () => {
        const { result } = renderHook(() => useNavigation());
        act(() => result.current.setActiveRecipesPage("recipe_box"));
        expect(result.current.activeRecipesPage).toBe("recipe_box");
    });

    it("should set activeCalendarPage", () => {
        const { result } = renderHook(() => useNavigation());
        act(() => result.current.setActiveCalendarPage("foo" as any));
        expect(result.current.activeCalendarPage).toBe("foo");
    });

    it("should set activeShoppingPage", () => {
        const { result } = renderHook(() => useNavigation());
        act(() => result.current.setActiveShoppingPage("inventory"));
        expect(result.current.activeShoppingPage).toBe("inventory");
    });

    it("should set activeReferencePage", () => {
        const { result } = renderHook(() => useNavigation());
        act(() => result.current.setActiveReferencePage("nutrition"));
        expect(result.current.activeReferencePage).toBe("nutrition");
    });

    it("should set activeToolsPage", () => {
        const { result } = renderHook(() => useNavigation());
        act(() => result.current.setActiveToolsPage("statistics"));
        expect(result.current.activeToolsPage).toBe("statistics");
    });

    it("should set activeSettingsPage", () => {
        const { result } = renderHook(() => useNavigation());
        act(() => result.current.setActiveSettingsPage("about"));
        expect(result.current.activeSettingsPage).toBe("about");
    });
});
