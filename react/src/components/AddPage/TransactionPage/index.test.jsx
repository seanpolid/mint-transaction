import { Category, Type } from '../../../models'
import { expect, describe, test, vi, afterEach } from 'vitest'
import { renderElement } from '../../../utils/test-functions'
import { rest } from 'msw'
import { screen, fireEvent, cleanup, waitFor } from '@testing-library/react'
import { setupServer } from 'msw/node'
import TransactionPage from '.'

const successHandlers = [
    rest.post("http://localhost:8080/api/transactions", (req, res, ctx) => {
        const savedTransactionDTOs = [
            {
                id: 1,
                identifier: "uuid",
                category: {
                    id: 1,
                    name: "Rent",
                    type: {
                        id: 1,
                        name: "Expense"
                    }
                },
                startDate: "2023-10-09",
                amount: "500",
                key: "uuid"
            }
        ]
        return res(ctx.status(201), ctx.json(savedTransactionDTOs));
    })
]

describe('Transaction Add Page', () => {
    const types = [new Type(1, "Income"), new Type(2, "Expense")];
    const category = new Category(1, "Rent", types[1]);
    const data = {
        categories: [category],
        types: types
    }

    afterEach(() => cleanup());

    test('should render empty form', () => {
        // Act
        renderElement(<TransactionPage />, data);

        // Assert
        expect(screen.getByText("Type:")).toBeDefined();
        expect(screen.getByLabelText("Expense").checked).toBeTruthy();
        expect(screen.getByLabelText("Category:")).toBeDefined();
        expect(screen.getByText("Recurs:")).toBeDefined();
        expect(screen.getByLabelText("Date:")).toBeDefined();
        expect(screen.getByLabelText("Amount ($):")).toBeDefined();
        expect(screen.getByLabelText("Notes:")).toBeDefined();
        expect(screen.getByRole("button", {name: "Add"})).toBeDefined();
        expect(screen.getByRole("button", {name: "Save"})).toBeDefined();
    })

    test('should handle type change', () => {
        // Act
        renderElement(<TransactionPage />, data);

        const incomeSelectionBeforeClick = screen.getByLabelText("Income").checked;
        fireEvent.click(screen.getByLabelText("Income"));
        const incomeSelectionAfterClick = screen.getByLabelText("Income").checked;

        // Assert
        expect(incomeSelectionBeforeClick).toBeFalsy();
        expect(incomeSelectionAfterClick).toBeTruthy();
    })

    test('should handle category change', () => {
        // Act
        renderElement(<TransactionPage />, data);
        
        const categorySelectionBeforeChange = screen.getByLabelText("Category:").value;
        fireEvent.change(screen.getByLabelText("Category:"), {target: {value: 1}});
        const categorySelectionAfterChange = screen.getByLabelText("Category:").selectedOptions[0].textContent;

        // Assert
        expect(categorySelectionBeforeChange).toBe("-- Choose option --");
        expect(categorySelectionAfterChange).toBe("Rent");
    })

    test('should handle recurs change', () => {
        // Act
        renderElement(<TransactionPage />, data);

        const recursSelectionBeforeClick = screen.getByLabelText("Yes").checked;
        const endDateInputBeforeClick = screen.queryByLabelText("End Date:");

        fireEvent.click(screen.getByLabelText("Yes"));

        const recursSelectionAfterClick = screen.getByLabelText("Yes").checked;
        const endDateInputAfterClick = screen.queryAllByLabelText("End Date:");

        // Assert
        expect(recursSelectionBeforeClick).toBeFalsy();
        expect(recursSelectionAfterClick).toBeTruthy();
        expect(endDateInputBeforeClick).toBeNull();
        expect(endDateInputAfterClick).not.toBeNull();
    })

    test('should handle amount change', () => {
        // Act
        renderElement(<TransactionPage />, data);
        fireEvent.change(screen.getByLabelText("Amount ($):"), {target: {value: "1.44"}});

        // Assert
        expect(screen.getByLabelText("Amount ($):").value).toBe("1.44");
    })

    test('should handle notes change', () => {
        // Act
        renderElement(<TransactionPage />, data);
        fireEvent.change(screen.getByLabelText("Notes:"), {target: {value: "new notes"}});

        // Assert
        expect(screen.getByLabelText("Notes:").value).toBe("new notes");
    })

    test('should handle add', () => {
        // Act
        renderElement(<TransactionPage />, data);
        
        const numFormsBeforeClick  = screen.getAllByText("Type:").length;
        fireEvent.click(screen.getByRole('button', {name: "Add"}));
        const numFormsAfterClick = screen.getAllByText("Type:").length;

        // Assert
        expect(numFormsBeforeClick).toBe(1);
        expect(numFormsAfterClick).toBe(2);
    })

    test('should handle save', async () => {
        // Arrange
        const server = setupServer(...successHandlers);
        server.listen();
        const data = {
            categories: [category],
            types: types,
            addTransactions: () => {}
        }
        const spy = vi.spyOn(data, 'addTransactions');

        // Act
        renderElement(<TransactionPage />, data);
        fireEvent.change(screen.getByLabelText("Category:"), {target: {value: 1}});     // save will be rejected if there isn't a valid category
        fireEvent.click(screen.getByRole('button', {name: 'Save'}));

        // Assert
        await waitFor(() => expect(spy).toHaveBeenCalledOnce());
        expect(screen.getByLabelText("Category:").value).toBe("-- Choose option --");   // indicates forms got reset

        server.close();
    })
})