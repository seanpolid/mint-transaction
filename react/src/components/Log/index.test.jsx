import DataContext from '../DataContext';
import { describe, test, expect, afterEach, vi } from 'vitest'
import Log from ".";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { tabType } from '../../enums/'
import { Transaction, Type, Category } from '../../models';

const renderElement = (element, data) => {
    render(
        <DataContext.Provider value={data}>
            {element}
        </DataContext.Provider>
    )
}

describe('Log', () => {
    const type = new Type(1, "Income");
    const category = new Category(1, "Job", type);
    const transaction = new Transaction(1, "uuid", type, category, "10/09/2023", "10/09/2023", 2000, "", "uuid");

    afterEach(() => cleanup());

    test('should render with a selected transaction', () => {
        // Arrange
        const element = <Log type={tabType.TRANSACTIONS} />
        const data = {
            transactions: [
                transaction
            ],
            selectedTransaction: transaction
        }
        // Act
        renderElement(element, data);

        // Assert
        expect(screen.getByText("Income")).toBeDefined();
        expect(screen.getByText("Job")).toBeDefined();
        expect(screen.getByText("$2000")).toBeDefined();
        expect(screen.getByText("10/09/2023")).toBeDefined();
        expect(screen.getByRole("row").className).toContain('active');
    })

    test('should style transaction row based on mouse', () => {
        // Arrange
        const element = <Log type={tabType.TRANSACTIONS} />
        const data = {
            transactions: [
                transaction
            ]
        }

        // Act
        renderElement(element, data);

        const classBeforeMouseEnter = screen.getByRole('row').className;
        fireEvent.mouseEnter(screen.getByRole('row'));
        const classAfterMouseEnter = screen.getByRole('row').className;

        fireEvent.mouseLeave(screen.getByRole('row'));
        const classAfterMouseLeave = screen.getByRole('row').className;

        // Assert
        expect(classBeforeMouseEnter).not.toContain('active');
        expect(classAfterMouseEnter).toContain('active');
        expect(classAfterMouseLeave).not.toContain('active');
    })

    test('should select transaction after click', () => {
        // Arrange
        const mockFunctions = {
            handleSelection: () => {}
        }
        const spy = vi.spyOn(mockFunctions, 'handleSelection').mockImplementation(() => {})
        const element = <Log type={tabType.TRANSACTIONS} handleSelection={mockFunctions.handleSelection}/>
        const data = {
            transactions: [
                transaction
            ]
        }

        // Act
        renderElement(element, data);
        fireEvent.click(screen.getByRole('row'));
        screen.getBy

        // Assert
        expect(spy).toHaveBeenCalledOnce();
    })
})
