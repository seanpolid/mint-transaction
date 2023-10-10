import { expect, test, describe, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import VerticalNavBar from ".";
import { iconType, tabType } from "../../enums";

const getIcon = (type) => {
    const icons = screen.getAllByRole('button');

    let iconToReturn = undefined;
    for (const icon of icons) {
        if (icon.getAttribute('data-type') === type) {
            iconToReturn = icon;
        }
    }

    return iconToReturn;
}

describe('VerticalNavBar', () => {

    test('should render with active log icon', () => {
        // Arrange
        const element = <VerticalNavBar currentTab={tabType.TRANSACTIONS} />;
        
        // Act
        render(element);

        // Assert
        const logIcon = getIcon(iconType.LOG);
        expect(logIcon).toBeDefined();
        expect(logIcon.className).toContain('active');
    })

    test('should render with active graph icon', () => {
        // Arrange
        const element = <VerticalNavBar currentTab={tabType.DASHBOARD} />;
        
        // Act
        render(element);

        // Assert
        const graphIcon = getIcon(iconType.GRAPH);
        expect(graphIcon).toBeDefined();
        expect(graphIcon.className).toContain('active');
    })

    test('should render with active target icon', () => {
        // Arrange
        const element = <VerticalNavBar currentTab={tabType.GOALS} />;
        
        // Act
        render(element);

        // Assert
        const targetIcon = getIcon(iconType.TARGET);
        expect(targetIcon).toBeDefined();
        expect(targetIcon.className).toContain('active');
    })

    test('should render with active user icon', () => {
        // Arrange
        const element = <VerticalNavBar currentTab={tabType.PROFILE} />;
        
        // Act
        render(element);
        
        // Assert
        const userIcon = getIcon(iconType.USER);
        expect(userIcon).toBeDefined();
        expect(userIcon.className).toContain('active');
    })

    test('should handle tab selection', () => {
        // Arrange
        const mockFunctions = {
            handleTabSelection: () => {}
        }
        const spy = vi.spyOn(mockFunctions, 'handleTabSelection').mockImplementation(() => {});
        const element = <VerticalNavBar currentTab={tabType.TRANSACTIONS} handleTabSelection={mockFunctions.handleTabSelection} />;
        
        // Act
        render(element);
        const userIcon = getIcon(iconType.USER);
        fireEvent.click(userIcon);

        // Assert
        expect(spy).toHaveBeenCalledOnce();
    })
});