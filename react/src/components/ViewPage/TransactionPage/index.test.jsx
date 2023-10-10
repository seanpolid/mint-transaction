import { expect, test, describe, vi, afterEach } from "vitest";
import { renderElement } from "../../../utils/test-functions";
import { screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { setupServer } from 'msw/node'
import { rest } from "msw";
import { Type, Category, Transaction } from "../../../models";
import TransactionPage from ".";

const successHandlers = [
    rest.delete('http://localhost:8080/api/transactions/*', (req, res, ctx) => {
        return res(ctx.status(204));
    }),
    rest.put('http://localhost:8080/api/transactions', (req, res, ctx) => {
        return res(ctx.status(204));
    })
]

const failureHandlers = [
    rest.delete('http://localhost:8080/api/transactions/*', (req, res, ctx) => {
        return res(ctx.status(500));
    }),
    rest.put('http://localhost:8080/api/transactions', (req, res, ctx) => {
        return res(ctx.status(500));
    })
]

describe('Transaction View Page', () => {
    const type = new Type(1, "Income");
    const category = new Category(1, "Job", type);
    const transaction = new Transaction(1, "uuid", type, category, "2023-10-09", "2023-10-25", 2000, "notes", "uuid");

    afterEach(() => cleanup());

    test('should render page with transaction', () => {
        // Arrange
        const data = {
            selectedTransaction: transaction,
            categories: [category]
        }
        
        // Act
        renderElement(<TransactionPage />, data);

        // Assert
        expect(screen.getByText("Income")).toBeDefined();
        expect(screen.getByDisplayValue("Job")).toBeDefined();
        expect(screen.getByLabelText("Start Date:").value).toBe("2023-10-09");
        expect(screen.getByLabelText("End Date:").value).toBe("2023-10-25");
        expect(screen.getByDisplayValue("$2000")).toBeDefined();
        expect(screen.getByLabelText("Notes:").value).toBe("notes");
        expect(screen.getByRole("button", {name: "Delete"})).toBeDefined();
        expect(screen.getByRole("button", {name: "Update"})).toBeDefined();
    })

    test('should handle delete', async () => {
        // Arrange
        const server = setupServer(...successHandlers);
        server.listen();
        const data = {
            selectedTransaction: transaction,
            categories: [category],
            removeTransaction: () => {}
        }
        const spy = vi.spyOn(data, 'removeTransaction');
        
        // Act
        renderElement(<TransactionPage />, data);
        fireEvent.click(screen.getByRole("button", {name: "Delete"}));

        // Assert
        await waitFor(() => expect(spy).toHaveBeenCalledOnce());
        
        server.close();
    })

    test('should handle update', async () => {
        // Arrange
        const server = setupServer(...successHandlers);
        server.listen();
        const data = {
            selectedTransaction: transaction,
            categories: [category],
            updateTransaction: () => {}
        }
        const spy = vi.spyOn(data, 'updateTransaction');

        // Act
        renderElement(<TransactionPage />, data);
        fireEvent.click(screen.getByRole('button', {name: 'Update'}));

        // Assert
        await waitFor(() => expect(spy).toHaveBeenCalledOnce());

        server.close();
    })

    test('should handle category change', () => {
        // Arrange
        const category2 = new Category(2, "Gift", type);
        const data = {
            selectedTransaction: transaction, 
            categories: [category, category2]
        }

        // Act
        renderElement(<TransactionPage />, data);
        fireEvent.change(screen.getByRole("combobox", {target: {value: 2}}));

        // Assert
        expect(screen.getByText("Gift")).toBeDefined();
    })

    test('should handle start date change', () => {
        // Arrange
        const data = {
            selectedTransaction: transaction,
            categories: [category]
        }

        // Act
        renderElement(<TransactionPage />, data);
        fireEvent.change(screen.getByLabelText("Start Date:"), {target: {value: "2023-09-05"}});

        // Assert
        expect(screen.getByLabelText('Start Date:').value).toBe("2023-09-05");
    })

    test('should handle end date change', () => {
        // Arrange
        const data = {
            selectedTransaction: transaction,
            categories: [category]
        }

        // Act
        renderElement(<TransactionPage />, data);
        fireEvent.change(screen.getByLabelText("End Date:"), {target: {value: "2023-09-05"}});

        // Assert
        expect(screen.getByLabelText('End Date:').value).toBe("2023-09-05");
    })

    test('should handle amount change', () => {
        // Arrange
        const data = {
            selectedTransaction: transaction,
            categories: [category]
        }

        // Act
        renderElement(<TransactionPage />, data);
        fireEvent.change(screen.getByDisplayValue("$2000"), {target: {value: "$1.01"}});

        // Assert
        expect(screen.getByDisplayValue("$1.01")).toBeDefined();
    })

    test('should handle empty amount change', () => {
        // Arrange
        const data = {
            selectedTransaction: transaction,
            categories: [category]
        }

        // Act
        renderElement(<TransactionPage />, data);
        fireEvent.change(screen.getByDisplayValue("$2000"), {target: {value: "$"}});

        // Assert
        expect(screen.getByDisplayValue("$0")).toBeDefined();
    })

    test('should handle invalid amount change', () => {
        // Arrange
        const data = {
            selectedTransaction: transaction,
            categories: [category]
        }

        // Act
        renderElement(<TransactionPage />, data);
        fireEvent.change(screen.getByDisplayValue("$2000"), {target: {value: "$abc"}});

        // Assert
        expect(screen.getByDisplayValue("$0")).toBeDefined();
    })

    test('should handle notes change', () => {
        // Arrange
        const data = {
            selectedTransaction: transaction,
            categories: [category]
        }

        // Act
        renderElement(<TransactionPage />, data);
        fireEvent.change(screen.getByLabelText("Notes:"), {target: {value: "new notes"}});

        // Assert
        expect(screen.getByLabelText("Notes:").value).toBe("new notes");
    })
})