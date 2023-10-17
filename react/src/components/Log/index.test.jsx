import { describe, test, expect, afterEach, vi } from 'vitest'
import Log from ".";
import { renderElement } from '../../utils/test-functions';
import { screen, cleanup } from "@testing-library/react";
import { tabType } from '../../enums/'
import { Transaction, Type, Category } from '../../models';
import userEvent from '@testing-library/user-event';

describe('Log', () => {
    const type = new Type(1, "Income");
    const category = new Category(1, "Job", type);
    const transaction = new Transaction(1, "uuid", type, category, "10/09/2023", "10/09/2023", 2000, "", "uuid");

    afterEach(() => cleanup());

    test('should render with a selected transaction', () => {
        // Arrange
        const element = <Log type={tabType.TRANSACTIONS} handleSelection={() => {}}/>
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

    test('should style transaction row based on mouse', async () => {
        // Arrange
        const user = userEvent.setup();
        const element = <Log type={tabType.TRANSACTIONS} handleSelection={() => {}}/>
        const data = {
            transactions: [
                transaction
            ]
        }

        // Act
        renderElement(element, data);

        const classBeforeMouseEnter = screen.getByRole('row').className;
        await user.hover(screen.getByRole('row'));
        const classAfterMouseEnter = screen.getByRole('row').className;

        await user.unhover(screen.getByRole('row'));
        const classAfterMouseLeave = screen.getByRole('row').className;

        // Assert
        expect(classBeforeMouseEnter).not.toContain('active');
        expect(classAfterMouseEnter).toContain('active');
        expect(classAfterMouseLeave).not.toContain('active');
    })

    test('should select transaction after click', async () => {
        // Arrange
        const user = userEvent.setup();
        const mockFunctions = {
            handleSelection: () => {}
        }
        const spy = vi.spyOn(mockFunctions, 'handleSelection')
        const element = <Log type={tabType.TRANSACTIONS} handleSelection={mockFunctions.handleSelection}/>
        const data = {
            transactions: [
                transaction
            ]
        }

        // Act
        renderElement(element, data);
        await user.click(screen.getByRole('row'));

        // Assert
        expect(spy).toHaveBeenCalledTimes(2);
    })
})