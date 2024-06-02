import { Category, Type } from '../../../models'
import endpointType from '../../../enums/endpointType'
import { expect, describe, test, afterEach, beforeEach } from 'vitest'
import apiService from '../../../services/ApiService'
import { renderElement } from '../../../utils/test-utils'
import { rest } from 'msw'
import { screen, cleanup, waitFor, within } from '@testing-library/react'
import { setupServer } from 'msw/node'
import TransactionPage from '.'
import userEvent from '@testing-library/user-event'

const types = [new Type(1, "Income"), new Type(2, "Expense")];
const category = new Category(1, "Rent", types[1]);

const successHandlers = [
    rest.get(apiService.getUri(endpointType.TYPES), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(types))
    }),
    rest.get(apiService.getUri(endpointType.CATEGORIES), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([category]))
    }),
    rest.get(apiService.getUri(endpointType.TRANSACTIONS), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]))
    }),
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
    }),
]

describe('Transaction Add Page', () => {

    let server = null;
    beforeEach(() => {
        server = setupServer(...successHandlers);
        server.listen();
    })

    afterEach(() => {
        cleanup();

        if (server) {
            server.close();
        }
    });

    test('should render empty form', async () => {
        // Act
        renderElement(<TransactionPage />);

        // Assert
        await waitFor(() => {
            expect(screen.queryByText("Type:")).not.toBeNull();
            expect(screen.getByLabelText("Expense").checked).toBeTruthy();
            expect(screen.queryByLabelText("Category:")).not.toBeNull();
            expect(screen.queryByText("Recurs:")).not.toBeNull();
            expect(screen.queryByLabelText("Date:")).not.toBeNull();
            expect(screen.queryByLabelText("Amount ($):")).not.toBeNull();
            expect(screen.queryByLabelText("Notes:")).not.toBeNull();
            expect(screen.queryByRole("button", {name: "Add"})).not.toBeNull();
            expect(screen.queryByRole("button", {name: "Save"})).not.toBeNull();
        })
    })
    
    
    test('should handle type change', async () => {
        // Arrange
        const user = userEvent.setup();
        renderElement(<TransactionPage />);

        // Act
        const incomeSelectionBeforeClick = (await screen.findByLabelText("Income")).checked;
        await user.click(await screen.findByLabelText("Income"));
        const incomeSelectionAfterClick = (await screen.findByLabelText("Income")).checked;

        // Assert
        expect(incomeSelectionBeforeClick).toBeFalsy();
        expect(incomeSelectionAfterClick).toBeTruthy();
    })

    
    test('should handle category change', async () => {
        // Arrange
        const user = userEvent.setup();
        renderElement(<TransactionPage />);

        // Act
        await user.type(await screen.findByLabelText("Category:"), 'Rent');

        // Assert
        expect((await screen.findByLabelText("Category:")).value).toBe("Rent");
    })

    test('should handle recurs change', async () => {
        // Arrange
        const user = userEvent.setup();
        renderElement(<TransactionPage />);

        // Act
        const recursSection = (await screen.findByText('Recurs:')).parentNode;
        const recursSelectionBeforeClick = (await within(recursSection).findByLabelText("Yes")).checked;
        const endDateInputBeforeClick = screen.queryByLabelText("End Date:");

        await user.click(await screen.findByLabelText("Yes"));

        const recursSection2 = (await screen.findByText('Recurs:')).parentNode;
        const recursSelectionAfterClick = (await within(recursSection2).findByLabelText("Yes")).checked;
        const endDateInputAfterClick = screen.queryByLabelText("End Date:");

        // Assert
        expect(recursSelectionBeforeClick).toBeFalsy();
        expect(recursSelectionAfterClick).toBeTruthy();
        expect(endDateInputBeforeClick).toBeNull();
        expect(endDateInputAfterClick).not.toBeNull();
    })

    test('should handle amount change', async () => {
        // Arrange
        const user = userEvent.setup();
        renderElement(<TransactionPage />);

        // Act
        await user.type(await screen.findByLabelText("Amount ($):"), "1.44");

        // Assert
        expect(screen.getByLabelText("Amount ($):").value).toBe("1.44");
    })

    test('should handle notes change', async () => {
        // Arrange
        const user = userEvent.setup();
        renderElement(<TransactionPage />);

        // Act
        await user.type(await screen.findByLabelText("Notes:"), "new notes");

        // Assert
        expect(screen.getByLabelText("Notes:").value).toBe("new notes");
    })

    test('should handle add', async () => {
        // Arrange
        const user = userEvent.setup();
        renderElement(<TransactionPage />);

        // Act
        const numFormsBeforeClick  = (await screen.findAllByText("Type:")).length;
        await user.click(await screen.findByRole('button', {name: "Add"}));
        const numFormsAfterClick = (await screen.findAllByText("Type:")).length;

        // Assert
        expect(numFormsBeforeClick).toBe(1);
        expect(numFormsAfterClick).toBe(2);
    })

    test('should handle save', async () => {
        // Arrange
        const user = userEvent.setup();
        renderElement(<TransactionPage />);

        // Act
        await user.type(await screen.findByLabelText("Category:"), 'Rent');     // save will be rejected if there isn't a valid category
        await user.click(await screen.findByRole('button', {name: 'Save'}));

        // Assert
        await waitFor(() => {
            expect(screen.getByLabelText("Category:").value).toBe("");   // indicates forms got reset which can only happen if save was successful
        });
        
    })

})