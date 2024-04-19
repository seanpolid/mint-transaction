import { describe, test, expect, afterEach, vi, beforeEach } from 'vitest'
import endpointType from '../../enums/endpointType';
import Log from ".";
import mapper from '../../utils/mapper';
import apiService from '../../services/ApiService';
import { renderElement } from '../../utils/test-utils';
import { rest } from 'msw';
import { screen, cleanup, waitFor } from "@testing-library/react";
import { setupServer } from 'msw/node';
import { tabType } from '../../enums/'
import { Transaction, Type, Category } from '../../models';
import userEvent from '@testing-library/user-event';

const type = new Type(1, "Income");
const category = new Category(1, "Job", type);
const transaction = new Transaction(1, "uuid", type, category, "10/09/2023", "10/09/2023", 2000, "", "uuid");

let successHandlers = [
    rest.get(apiService.getUri(endpointType.TYPES), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([type]))
    }),
    rest.get(apiService.getUri(endpointType.CATEGORIES), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([category]))
    }),
    rest.get(apiService.getUri(endpointType.TRANSACTIONS), (req, res, ctx) => {
        const savedTransactionDTOs = mapper.mapToTransactionDTO(transaction);
        return res(ctx.status(200), ctx.json([savedTransactionDTOs]));
    }),
]

describe('Log', () => {
    
    let server = null;

    afterEach(() => {
        cleanup();
        server.close();    
    });

    test('should render with a selected transaction', async () => {
        // Arrange
        server = setupServer(...successHandlers);
        server.listen();
        const element = <Log type={tabType.TRANSACTIONS} handleSelection={() => {}} selectedId={1} />

        // Act
        renderElement(element);

        // Assert
        await waitFor(() => {
            expect(screen.queryByText("Income")).not.toBeNull();
            expect(screen.queryByText("Job")).not.toBeNull();
            expect(screen.queryByText("$2000")).not.toBeNull();
            expect(screen.queryByText("10/09/2023")).not.toBeNull();
            expect(screen.getByRole("row").className).toContain('active');
        })
    })
    
    test('should style transaction row based on mouse', async () => {
        // Arrange
        server = setupServer(...successHandlers);
        server.listen();
        const user = userEvent.setup();
        const element = <Log type={tabType.TRANSACTIONS} handleSelection={() => {}}/>

        // Act
        renderElement(element);

        const classBeforeMouseEnter = (await screen.findByRole('row')).className;
        await user.hover(await screen.findByRole('row'));
        const classAfterMouseEnter = (await screen.findByRole('row')).className;

        await user.unhover(await screen.findByRole('row'));
        const classAfterMouseLeave = (await screen.findByRole('row')).className;

        // Assert
        await waitFor(() => {
            expect(classBeforeMouseEnter).not.toContain('active');
            expect(classAfterMouseEnter).toContain('active');
            expect(classAfterMouseLeave).not.toContain('active');
        })
    })
    
    test('should select transaction after click', async () => {
        // Arrange
        server = setupServer(...successHandlers);
        server.listen();
        const user = userEvent.setup();
        const mockFunctions = {
            handleSelection: () => {}
        }
        const spy = vi.spyOn(mockFunctions, 'handleSelection')
        const element = <Log type={tabType.TRANSACTIONS} handleSelection={mockFunctions.handleSelection} />

        // Act
        renderElement(element);
        await user.click(await screen.findByRole('row'));

        // Assert
        expect(spy).toHaveBeenCalledOnce();
    })
    
    test('should show sort window after click', async () => {
        // Arrange
        server = setupServer(...successHandlers);
        server.listen();
        const user = userEvent.setup();
        const element = <Log type={tabType.TRANSACTIONS} handleSelection={() => {}}/>
        renderElement(element);

        // Act
        await user.click(await screen.findByRole('button', {name: 'sort items'}));

        // Assert
        expect(screen.queryByText("Ascending")).not.toBeNull();
    })
    
    test('should show active sort options', async () => {
        // Arrange
        server = setupServer(...successHandlers);
        server.listen();
        const user = userEvent.setup();
        const element = <Log type={tabType.TRANSACTIONS} handleSelection={() => {}}/>
        renderElement(element);

        // Act
        await user.click(await screen.findByRole('button', {name: 'sort items'}));

        // Assert
        await waitFor(() => {
            expect(screen.getByLabelText("Descending").checked).toBeTruthy();
            expect(screen.getByText("Date").className).toContain("active");
        })
    })
    
    test('should sort in descending order', async () => {
        // Arrange
        const element = <Log type={tabType.TRANSACTIONS} handleSelection={() => {}}/>
        successHandlers = successHandlers.toSpliced(2, 1);

        const transactions = [
                new Transaction(1, "uuid", type, category, "10/09/2023", "10/09/2023", 2000, "", "uuid"),
                new Transaction(2, "uuid1", type, category, "10/08/2023", null, 2000, "", "uuid1"),
                new Transaction(3, "uuid2", type, category, "10/07/2023", null, 2000, "", "uuid2"),
        ];
        const transactionDTOS = transactions.map(transaction => mapper.mapToTransactionDTO(transaction));
        successHandlers.push(rest.get(apiService.getUri(endpointType.TRANSACTIONS), (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(transactionDTOS));
        }));

        server = setupServer(...successHandlers);
        server.listen();

        renderElement(element);

        // Act
        const transactionRows = await screen.findAllByRole("row");

        // Assert
        expect(transactionRows.length).toBe(3);
        expect(transactionRows[0].textContent).toContain("10/09/2023");
        expect(transactionRows[transactionRows.length - 1].textContent).toContain("10/07/2023");
    })
    
    test('should sort in ascending order', async () => {
        // Arrange
        const user = userEvent.setup();
        const element = <Log type={tabType.TRANSACTIONS} handleSelection={() => {}}/>
        successHandlers = successHandlers.toSpliced(2, 1);

        const transactions = [
                new Transaction(1, "uuid", type, category, "10/09/2023", "10/09/2023", 2000, "", "uuid"),
                new Transaction(2, "uuid1", type, category, "10/08/2023", null, 2000, "", "uuid1"),
                new Transaction(3, "uuid2", type, category, "10/07/2023", null, 2000, "", "uuid2"),
        ];
        const transactionDTOS = transactions.map(transaction => mapper.mapToTransactionDTO(transaction));
        successHandlers.push(rest.get(apiService.getUri(endpointType.TRANSACTIONS), (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(transactionDTOS));
        }));

        server = setupServer(...successHandlers);
        server.listen();

        renderElement(element);

        // Act
        await user.click(await screen.findByRole('button', {name: 'sort items'}));
        await user.click(await screen.findByLabelText('Ascending'));
        await user.click(document.getElementById('overlay'));
        const transactionRows = await screen.findAllByRole("row");

        // Assert
        expect(transactionRows.length).toBe(3);
        expect(transactionRows[0].textContent).toContain("10/07/2023");
        expect(transactionRows[transactionRows.length - 1].textContent).toContain("10/09/2023");
    })
    
    test('should sort by amount', async () => {
        // Arrange
        const user = userEvent.setup();
        const element = <Log type={tabType.TRANSACTIONS} handleSelection={() => {}}/>
        successHandlers = successHandlers.toSpliced(2, 1);

        const transactions = [
                new Transaction(1, "uuid", type, category, "10/09/2023", "10/09/2023", 1000, "", "uuid"),
                new Transaction(2, "uuid1", type, category, "10/08/2023", null, 2000, "", "uuid1"),
                new Transaction(3, "uuid2", type, category, "10/07/2023", null, 3000, "", "uuid2"),
        ];
        const transactionDTOS = transactions.map(transaction => mapper.mapToTransactionDTO(transaction));
        successHandlers.push(rest.get(apiService.getUri(endpointType.TRANSACTIONS), (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(transactionDTOS));
        }));

        server = setupServer(...successHandlers);
        server.listen();

        renderElement(element);

        // Act
        await user.click(await screen.findByRole('button', {name: 'sort items'}));
        await user.click(await screen.findByText('Amount'));
        await user.click(document.getElementById('overlay'));
        const transactionRows = await screen.findAllByRole("row");

        // Assert
        expect(transactionRows.length).toBe(3);
        expect(transactionRows[0].textContent).toContain("3000");
        expect(transactionRows[transactionRows.length - 1].textContent).toContain("1000");
    })
    
    test('should sort by category', async () => {
        // Arrange
        const user = userEvent.setup();
        const element = <Log type={tabType.TRANSACTIONS} handleSelection={() => {}}/>
        successHandlers = successHandlers.toSpliced(2, 1);

        const transactions = [
                new Transaction(1, "uuid", type, new Category(1, "Groceries", type), "10/09/2023", null, 1000, "", "uuid"),
                new Transaction(2, "uuid1", type, new Category(2, "Rent", type), "10/09/2023", null, 1000, "", "uuid1"),
                new Transaction(3, "uuid2", type, new Category(3, "Other", type), "10/09/2023", null, 1000, "", "uuid2"),
        ]
        const transactionDTOS = transactions.map(transaction => mapper.mapToTransactionDTO(transaction));
        successHandlers.push(rest.get(apiService.getUri(endpointType.TRANSACTIONS), (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(transactionDTOS));
        }));

        server = setupServer(...successHandlers);
        server.listen();

        renderElement(element);

        // Act
        await user.click(await screen.findByRole('button', {name: 'sort items'}));
        await user.click(await screen.findByText('Category'));
        await user.click(document.getElementById('overlay'));
        const transactionRows = await screen.findAllByRole("row");

        // Assert
        expect(transactionRows.length).toBe(3);
        expect(transactionRows[0].textContent).toContain("Rent");
        expect(transactionRows[transactionRows.length - 1].textContent).toContain("Groceries");
    })
    
})
