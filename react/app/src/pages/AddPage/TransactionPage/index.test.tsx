import userEvent from '@testing-library/user-event'
import { screen, cleanup, waitFor, within } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { expect, describe, test, afterEach, beforeEach } from 'vitest'

import { Category, Type } from '../../../models'
import { Endpoint } from '../../../enums'
import { getUri } from '../../../services/ApiService'
import { renderElement } from '../../../utils/test-utils'
import { TransactionPage } from '.'

const types = [new Type(1, "Income"), new Type(2, "Expense")];
const category = new Category(1, "Rent", types[1]);

const successHandlers = [
    rest.get(getUri(Endpoint.Types), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(types))
    }),
    rest.get(getUri(Endpoint.Categories), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([category]))
    }),
    rest.get(getUri(Endpoint.Transactions), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]))
    }),
    rest.post(getUri(Endpoint.Transactions), (req, res, ctx) => {
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

    let server: any = null;
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
            const expenseRadioButton: HTMLInputElement = screen.getByLabelText('Expense');

            expect(screen.queryByText("Type:")).not.toBeNull();
            expect(expenseRadioButton.checked).toBeTruthy();
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
        const incomeRadioButtonBefore: HTMLInputElement = await screen.findByLabelText('Income');
        const incomeSelectionBeforeClick = incomeRadioButtonBefore.checked;

        await user.click(await screen.findByLabelText("Income"));

        const incomeRadioButtonAfter: HTMLInputElement = await screen.findByLabelText('Income');
        const incomeSelectionAfterClick = incomeRadioButtonAfter.checked;

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
        const categoryInput: HTMLInputElement = await screen.findByLabelText("Category:");
        expect(categoryInput.value).toBe("Rent");
    })

    test('should handle recurs change', async () => {
        // Arrange
        const user = userEvent.setup();
        renderElement(<TransactionPage />);

        // Act
        let recursSection: HTMLElement = (await screen.findByText('Recurs:')).parentNode as HTMLElement;
        let yesRadioButton: HTMLInputElement = await within(recursSection).findByLabelText("Yes");
        const yesRadioButtonBeforeClick = yesRadioButton.checked;
        const endDateInputBeforeClick = screen.queryByLabelText("End Date:");

        await user.click(await screen.findByLabelText("Yes"));

        recursSection = (await screen.findByText('Recurs:')).parentNode as HTMLElement;
        yesRadioButton = await within(recursSection).findByLabelText("Yes");
        const yesRadioButtonAfterClick = yesRadioButton.checked;
        const endDateInputAfterClick = screen.queryByLabelText("End Date:");

        // Assert
        expect(yesRadioButtonBeforeClick).toBeFalsy();
        expect(yesRadioButtonAfterClick).toBeTruthy();
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
        const amountInput: HTMLInputElement = screen.getByLabelText("Amount ($):");
        expect(amountInput.value).toBe("1.44");
    })
    
    test('should handle notes change', async () => {
        // Arrange
        const user = userEvent.setup();
        renderElement(<TransactionPage />);

        // Act
        await user.type(await screen.findByLabelText("Notes:"), "new notes");

        // Assert
        const notesTextArea: HTMLTextAreaElement = screen.getByLabelText("Notes:");
        expect(notesTextArea.value).toBe("new notes");
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
            const categoryInput: HTMLInputElement = screen.getByLabelText("Category:");
            expect(categoryInput.value).toBe("");   // indicates forms got reset which can only happen if save was successful
        });
        
    })

})