import { expect, test, describe, vi, afterEach, beforeEach } from "vitest";
import endpointType from "../../../enums/endpointType";
import apiService from "../../../services/ApiService";
import mapper from "../../../utils/mapper";
import { renderElement } from '../../../utils/test-utils'
import { screen, cleanup, waitFor, fireEvent } from "@testing-library/react";
import { setupServer } from 'msw/node'
import { rest } from "msw";
import { Type, Category, Transaction } from "../../../models";
import TransactionPage from ".";
import userEvent from "@testing-library/user-event";

const types = [new Type(1, "Income"), new Type(2, "Expense")];
const categories = [new Category(1, "Job", types[0]), new Category(2, "Gift", types[0])];
const transaction = new Transaction(1, "uuid", types[0], categories[0], "2023-10-09", "2023-10-25", 2000, "notes", "uuid");

const successHandlers = [
    rest.get(apiService.getUri(endpointType.TYPES), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(types))
    }),
    rest.get(apiService.getUri(endpointType.CATEGORIES), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(categories))
    }),
    rest.get(apiService.getUri(endpointType.TRANSACTIONS), (req, res, ctx) => {
        const transactionDTO = mapper.mapToTransactionDTO(transaction);
        return res(ctx.status(200), ctx.json([transactionDTO]))
    }),
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

    test('should render page with transaction', async () => {
        // Act
        renderElement(<TransactionPage />, transaction);

        // Assert
        await waitFor(() => {
            expect(screen.queryByText("Income")).not.toBeNull();
            expect(screen.queryByDisplayValue("Job")).not.toBeNull();
            expect(screen.getByLabelText("Start Date:").value).toBe("2023-10-09");
            expect(screen.getByLabelText("End Date:").value).toBe("2023-10-25");
            expect(screen.queryByDisplayValue("$2000")).not.toBeNull();
            expect(screen.getByLabelText("Notes:").value).toBe("notes");
            expect(screen.queryByRole("button", {name: "Delete"})).not.toBeNull();
            expect(screen.queryByRole("button", {name: "Update"})).not.toBeNull();
        })
    })
    
    test('should handle delete', async () => {
        // Arrange
        const user = userEvent.setup();
        renderElement(<TransactionPage />, transaction);

        // Act
        await user.click(await screen.findByRole("button", {name: "Delete"}));

        // Assert
        await waitFor(() => {
            expect(screen.queryByText('No transactions to view.')).not.toBeNull();
        });
    })
    
    test('should handle update', async () => {
        // Arrange
        const user = userEvent.setup();
        renderElement(<TransactionPage />, transaction);

        // Act
        await user.click(await screen.findByRole('button', {name: 'Update'}));

        // Assert
        await waitFor(() => {
            expect(screen.queryByText('Income')).not.toBeNull();
        });
    })
    
    test('should handle category change', async () => {
        // Arrange
        const user = userEvent.setup();
        renderElement(<TransactionPage />, transaction);

        // Act
        await user.selectOptions(await screen.findByRole("combobox"), '2');

        // Assert
        await waitFor(() => {
            expect(screen.queryByText("Gift")).not.toBeNull();
        })
    })
    
    test('should handle start date change', async () => {
        // Arrange
        const user = userEvent.setup();
        renderElement(<TransactionPage />, transaction);

        // Act
        fireEvent.change(await screen.findByLabelText("Start Date:"), {target: {value: "2023-09-05"}});

        // Assert
        await waitFor(() => {
            expect(screen.getByLabelText('Start Date:').value).toBe("2023-09-05");
        })
    })
    
    test('should handle end date change', async () => {
        // Arrange
        renderElement(<TransactionPage />, transaction);

        // Act
        fireEvent.change(await screen.findByLabelText("End Date:"), {target: {value: "2023-09-05"}});

        // Assert
        await waitFor(() => {
            expect(screen.getByLabelText('End Date:').value).toBe("2023-09-05");
        })
    })
    
    test('should handle amount change', async () => {
        // Arrange
        const user = userEvent.setup();
        renderElement(<TransactionPage />, transaction);

        // Act
        await user.clear(await screen.findByDisplayValue("$2000"));
        await user.type(await screen.findByDisplayValue("$0"), "$1.01");

        // Assert
        await waitFor(() => {
            expect(screen.queryByDisplayValue("$1.01")).not.toBeNull();
        })
    })
    
    test('should handle empty amount change', async () => {
        // Arrange
        const user = userEvent.setup();
        renderElement(<TransactionPage />, transaction);

        // Act
        await user.clear(await screen.findByDisplayValue("$2000"));

        // Assert
        await waitFor(() => {
            expect(screen.queryByDisplayValue("$0")).not.toBeNull();
        })
    })
    
    test('should handle invalid amount change', async () => {
        // Arrange
        const user = userEvent.setup();
        renderElement(<TransactionPage />, transaction);

        // Act
        await user.clear(await screen.findByDisplayValue("$2000"));
        await user.type(await screen.findByDisplayValue("$0"), "$abc");

        // Assert
        await waitFor(() => {
            expect(screen.queryByDisplayValue("$0")).not.toBeNull();
        })
    })

    test('should handle notes change', async () => {
        // Arrange
        const user = userEvent.setup();
        renderElement(<TransactionPage />, transaction);

        // Act
        await user.clear(await screen.findByLabelText("Notes:"));
        await user.type(await screen.findByLabelText("Notes:"), "new notes");

        // Assert
        await waitFor(() => {
            expect(screen.getByLabelText("Notes:").value).toBe("new notes");
        })
    })

})