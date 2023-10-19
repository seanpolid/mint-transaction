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

    test('should show sort window after click', async () => {
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
        await user.click(screen.getByRole('button', {name: 'sort items'}));

        // Assert
        expect(screen.getByText("Ascending")).toBeDefined();
    })

    test('should show active sort options', async () => {
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
        await user.click(screen.getByRole('button', {name: 'sort items'}));

        // Assert
        expect(screen.getByLabelText("Descending").checked).toBeTruthy();
        expect(screen.getByText("Date").className).toContain("active");
    })

    test('should sort in descending order', () => {
        // Arrange
        const element = <Log type={tabType.TRANSACTIONS} handleSelection={() => {}}/>
        const data = {
            transactions: [
                new Transaction(1, "uuid", type, category, "10/09/2023", "10/09/2023", 2000, "", "uuid"),
                new Transaction(2, "uuid1", type, category, "10/08/2023", null, 2000, "", "uuid1"),
                new Transaction(3, "uuid2", type, category, "10/07/2023", null, 2000, "", "uuid2"),
            ]
        }

        // Act
        renderElement(element, data);
        const transactions = screen.getAllByRole("row");

        // Assert
        expect(transactions.length).toBe(3);
        expect(transactions[0].textContent).toContain("10/09/2023");
        expect(transactions[transactions.length - 1].textContent).toContain("10/07/2023");
    })

    test('should sort in ascending order', async () => {
        // Arrange
        const user = userEvent.setup();
        const element = <Log type={tabType.TRANSACTIONS} handleSelection={() => {}}/>
        const data = {
            transactions: [
                new Transaction(1, "uuid", type, category, "10/09/2023", null, 2000, "", "uuid"),
                new Transaction(2, "uuid1", type, category, "10/08/2023", null, 2000, "", "uuid1"),
                new Transaction(3, "uuid2", type, category, "10/07/2023", null, 2000, "", "uuid2"),
            ]
        }

        // Act
        renderElement(element, data);
        await user.click(screen.getByRole('button', {name: 'sort items'}));
        await user.click(screen.getByLabelText('Ascending'));
        await user.click(document.getElementById('overlay'));
        const transactions = screen.getAllByRole("row");

        // Assert
        expect(transactions.length).toBe(3);
        expect(transactions[0].textContent).toContain("10/07/2023");
        expect(transactions[transactions.length - 1].textContent).toContain("10/09/2023");
    })

    test('should sort by amount', async () => {
        // Arrange
        const user = userEvent.setup();
        const element = <Log type={tabType.TRANSACTIONS} handleSelection={() => {}}/>
        const data = {
            transactions: [
                new Transaction(1, "uuid", type, category, "10/09/2023", null, 1000, "", "uuid"),
                new Transaction(2, "uuid1", type, category, "10/09/2023", null, 2000, "", "uuid1"),
                new Transaction(3, "uuid2", type, category, "10/09/2023", null, 3000, "", "uuid2"),
            ]
        }

        // Act
        renderElement(element, data);
        await user.click(screen.getByRole('button', {name: 'sort items'}));
        await user.click(screen.getByText('Amount'));
        await user.click(document.getElementById('overlay'));
        const transactions = screen.getAllByRole("row");

        // Assert
        expect(transactions.length).toBe(3);
        expect(transactions[0].textContent).toContain("3000");
        expect(transactions[transactions.length - 1].textContent).toContain("1000");
    })

    test('should sort by category', async () => {
        // Arrange
        const user = userEvent.setup();
        const element = <Log type={tabType.TRANSACTIONS} handleSelection={() => {}}/>
        const data = {
            transactions: [
                new Transaction(1, "uuid", type, new Category(1, "Groceries", type), "10/09/2023", null, 1000, "", "uuid"),
                new Transaction(2, "uuid1", type, new Category(2, "Rent", type), "10/09/2023", null, 1000, "", "uuid1"),
                new Transaction(3, "uuid2", type, new Category(3, "Other", type), "10/09/2023", null, 1000, "", "uuid2"),
            ]
        }

        // Act
        renderElement(element, data);
        await user.click(screen.getByRole('button', {name: 'sort items'}));
        await user.click(screen.getByText('Category'));
        await user.click(document.getElementById('overlay'));
        const transactions = screen.getAllByRole("row");

        // Assert
        expect(transactions.length).toBe(3);
        expect(transactions[0].textContent).toContain("Rent");
        expect(transactions[transactions.length - 1].textContent).toContain("Groceries");
    })

})
